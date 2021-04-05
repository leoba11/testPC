import React, { useEffect, useState } from "react";
import IPage from "../interfaces/page";
import logging from "../config/logging";
import { FormGroup, Input, Button } from "reactstrap";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import AuthContainer from "../components/authContainer";

const RegisterPage: React.FunctionComponent<IPage> = (props) => {
  const [authing, setAuthing] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [redirect, setRedirect] = useState<string>("");

  useEffect(() => {
    logging.info(`Loading ${props.name}`);
  }, [props.name]);

  const Register = async () => {
    // Do some error checking!
    if (password !== confirm) {
      setError("Passwords dont match!");
      return;
    }

    if (error !== "") setError("");

    setAuthing(true);

    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:8080/users/register",
        data: {
          username,
          firstName,
          lastName,
          email,
          password,
        },
      });

      if (response.status === 201) {
        // Could also use history.push('/login')
        setRedirect("/login");
      } else {
        setError("Unable to register, please try again!");
        setAuthing(false);
      }
    } catch (error) {
      setError("Unable to register, please try again!");
      logging.error(error, "Register");
      setAuthing(false);
    }
  };

  if (redirect !== "") {
    return <Redirect to={redirect} />;
  }

  return (
    <AuthContainer cardHeader="Register">
      <FormGroup>
        <Input
          type="text"
          name="username"
          id="username"
          placeholder="Enter username..."
          onChange={(event) => setUsername(event.target.value)}
          value={username}
        />
      </FormGroup>

      <FormGroup>
        <Input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Enter firstName..."
          onChange={(event) => setFirstName(event.target.value)}
          value={firstName}
        />
      </FormGroup>

      <FormGroup>
        <Input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Enter lastName..."
          onChange={(event) => setLastName(event.target.value)}
          value={lastName}
        />
      </FormGroup>

      <FormGroup>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email..."
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
      </FormGroup>

      <FormGroup>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Enter password..."
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </FormGroup>

      <FormGroup>
        <Input
          type="password"
          name="confirm"
          id="confirm"
          placeholder="Confirm password..."
          onChange={(event) => setConfirm(event.target.value)}
          value={confirm}
        />
      </FormGroup>

      <Button disabled={authing} color="info" block onClick={Register}>
        Register
      </Button>

      <small>
        <p className="m-1 text-center">
          Already have an account? <Link to="/login">Login.</Link>
        </p>
      </small>
      {error !== "" && <small className="text-danger">{error}</small>}
    </AuthContainer>
  );
};

export default RegisterPage;
