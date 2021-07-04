import React from "react";
import { CategoryContainer } from "./Category.styles";
import CategoryItems from "../CategoryItems/CategoryItem";
const Category = () => {
  return (
    <CategoryContainer>
      <CategoryItems
        title="fille"
        image="https://cdn.pixabay.com/photo/2016/02/23/04/52/model-1216916_960_720.jpg"
      />
      <CategoryItems
        title="graçon"
        image="https://cdn.pixabay.com/photo/2017/11/06/13/45/cap-2923682_960_720.jpg"
      />
    </CategoryContainer>
  );
};

export default Category;
