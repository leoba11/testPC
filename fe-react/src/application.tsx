import React, { useEffect, useState } from "react";
import logging from "./config/logging";
import {
    Switch,
    Route,
    RouteComponentProps,
    useHistory,
} from "react-router-dom";
import routes from "./config/routes";
import IUser from "./interfaces/user";
import axios from "axios";

import CircularProgress from "@material-ui/core/CircularProgress";
import { UserContextProvider } from "./contexts/user";

import "bootstrap/dist/css/bootstrap.css";

const Application: React.FunctionComponent<{}> = (props) => {
    // State Values
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const history = useHistory();

    useEffect(() => {
        logging.info("Loading App....");

        if (user === null || token === null) {
            logging.info(
                "Not logged in in current session, checking localstorage",
                "Auth"
            );

            let _token = localStorage.getItem("token");
            let _user = localStorage.getItem("user");

            if (_user === null || _token === null) {
                logging.info("Nothing in localstorage, removing vars and redirecting");
                Logout();
                history.push("/login");
                setLoading(false);
            } else {
                logging.info("Credentials found, verifying.", "Auth");
                VerifyLocalStorageCredentials(_token, _user);
            }
        }
        // eslint-disable-next-line
    }, []);

    const VerifyLocalStorageCredentials = async (
        _token: string,
        _user: string
    ) => {
        try {
            let _parsedUser = JSON.parse(_user);

            let response = await axios({
                method: "GET",
                url: `http://localhost:8080/users/validate`,
                headers: {
                    Authorization: `Bearer ${_token}`,
                },
            });

            if (response.status === 200 || response.status === 304) {
                Login(_parsedUser, _token);
                setLoading(false);
            } else {
                logging.info("Credentials no longer valid", "Auth");
                Logout();
                history.push("/login");
                setLoading(false);
            }
        } catch (error) {
            logging.error(error, "Auth");
            Logout();
            history.push("/login");
            setLoading(false);
        }
    };

    const Login = (_user: IUser, _token: string) => {
        setUser(_user);
        setToken(_token);

        localStorage.setItem("user", JSON.stringify(_user));
        localStorage.setItem("token", _token);
    };

    const Logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setUser(null);
        setToken(null);
    };

    if (loading) {
        return <CircularProgress />;
    }

    let userContextValue = {
        user,
        token,
        Login,
        Logout,
    };

    return (
        <div>
            <UserContextProvider value={userContextValue}>
                <Switch>
                    {routes.map((route, index) => {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                render={(props: RouteComponentProps<any>) => (
                                    <route.component
                                        name={route.name}
                                        {...props}
                                        {...route.props}
                                    />
                                )}
                            />
                        );
                    })}
                </Switch>
            </UserContextProvider>
        </div>
    );
};

export default Application;
