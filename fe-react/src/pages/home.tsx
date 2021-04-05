import React, { useEffect } from "react";
import IPage from "../interfaces/page";
import logging from "../config/logging";
import NavbarComponent from "../components/NavBar";

import { makeStyles } from "@material-ui/core/styles";
import ReportTable from "../components/reportTable";

const useStyles = makeStyles((theme) => ({
}));

const HomePage: React.FunctionComponent<IPage> = (props) => {
  // const classes = useStyles();

  useEffect(() => {
    logging.info(`Loading ${props.name}`);
  }, [props.name]);

  return (
    <div>
      <NavbarComponent />
      <br/>
        <h1> Home Page (ADMINISTRADOR) </h1>
        <br/>
      <ReportTable></ReportTable>
    </div>
  );
};

export default HomePage;
