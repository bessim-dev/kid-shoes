import React from "react";
import {
  BackgroundImgComponent,
  TitleComponent,
  SubtitleComponent,
  ContentComponent,
  MenuItemComponent,
} from "./CategoryItem.styles";
import { withRouter } from "react-router-dom";
const CategoryItems = ({ history, match, title, image }) => {
  return (
    <MenuItemComponent
      onClick={() => history.push(`${match.url}genres/${title}`)}
    >
      <BackgroundImgComponent className="background-image" imageUrl={image} />
      <ContentComponent className="content">
        <TitleComponent>{title.toUpperCase()}</TitleComponent>
        <SubtitleComponent>Shop Now</SubtitleComponent>
      </ContentComponent>
    </MenuItemComponent>
  );
};

export default withRouter(CategoryItems);
