import IRoute from "../interfaces/route";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import CommercialHome from "../pages/comercialHome";
import EditReport from "../components/editReport";

const routes: IRoute[] = [
  {
    path: "/",
    name: "Home Page",
    component: HomePage,
    exact: true,
  },
  {
    path: "/commercial",
    name: "Commercial Page",
    component: CommercialHome,
    exact: true,
  },
  {
    path: "/login",
    name: "Login Page",
    component: LoginPage,
    exact: true,
  },
  {
    path: "/register",
    name: "Register Page",
    component: RegisterPage,
    exact: true,
  },
  {
    path: "/edit",
    name: "Edit Page",
    component: EditReport,
    exact: true,
  },
];

export default routes;
