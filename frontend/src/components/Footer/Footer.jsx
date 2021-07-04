import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const Footer = () => {
  return (
    <footer className="footer">
      <Typography variant="body1" color="textPrimary">
        {"Copyright © "}
        <Link color="inherit" href="https://bessimboujebli.netlify.app/">
          Bessim Boujebli
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </footer>
  );
};

export default Footer;
