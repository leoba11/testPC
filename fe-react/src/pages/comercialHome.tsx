import React from "react";
import IPage from "../interfaces/page";
import NavbarComponent from "../components/NavBar";
import ReportTable from "../components/reportTable";
import CommerTable from "../components/commerTable";


const CommercialHomePage: React.FunctionComponent<IPage> = (props) => {

  return (
    <div>
        <NavbarComponent/>
        <br/>
        <h1> Home Page (COMERCIAL) </h1>
        <br/>
        <CommerTable/>
    </div>
  )
}


export default CommercialHomePage;
