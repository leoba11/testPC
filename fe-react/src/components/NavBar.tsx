import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputIcon from "@material-ui/icons/Input";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const NavbarComponent: React.FunctionComponent<{}> = () => {
  const classes = useStyles();
  const [redirect, setRedirect] = useState<string>("");

  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setRedirect("/login");
  };

  if (redirect !== "") {
    return <Redirect to={redirect} />;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        
        <Typography variant="h6" className={classes.title}>
          People Connection Test
        </Typography>
        <Button color="inherit" onClick={Logout}>
          {" "}
          <InputIcon />{" "}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarComponent;