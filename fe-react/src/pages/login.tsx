import React, { useContext, useEffect, useState } from "react";
import IPage from "../interfaces/page";
import logging from "../config/logging";
import { Button, FormGroup, Input } from "reactstrap";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import AuthContainer from "../components/authContainer";
import UserContext from "../contexts/user";

const LoginPage: React.FunctionComponent<IPage> = (props) => {
    const [authing, setAuthing] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [redirect, setRedirect] = useState<string>("");
    let isAdmin: boolean;

    const userContext = useContext(UserContext);

    useEffect(() => {
        logging.info(`Loading ${props.name}`);
    }, [props.name]);

    const Login = async () => {
        if (error !== "") setError("");

        setAuthing(true);

        try {
            const response = await Axios({
                method: "POST",
                url: "http://localhost:8080/users/login",
                data: {
                    username,
                    password,
                },
            });

            if (response.status === 200 || response.status === 304) {
                userContext.Login(response.data.user, response.data.token);
                isAdmin = response.data.user.admin;
                if(isAdmin) {
                    setRedirect("/");
                }else {
                    setRedirect("/commercial");
                }

            } else {
                setError("Unable to sign in, please try again!");
                setAuthing(false);
            }
        } catch (error) {
            setError("Unable to sign in, please try again!");
            logging.error(error, "Login");
            setAuthing(false);
        }
    };

    if (redirect !== "") {
        return <Redirect to={redirect} />;
    }

    return (
        <AuthContainer cardHeader="Login">
            <FormGroup>
                <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter username ..."
                    onChange={(event) => setUsername(event.target.value)}
                    value={username}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter password ..."
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                />
            </FormGroup>
            <Button disabled={authing} color="info" block onClick={Login}>
                Login
            </Button>
            {error !== "" && <small className="text-danger">{error}</small>}
        </AuthContainer>
    );
};

export default LoginPage;
