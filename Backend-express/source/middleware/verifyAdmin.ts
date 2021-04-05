import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import jwt_decode from 'jwt-decode'

const NAMESPACE = "VerifyAdmin";

interface MyToken {
    username: string;
    admin: boolean;
    iat: number;
    exp: number;
    iss: string;
}

const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Validating Token');

    let token = req.headers.authorization?.split(' ')[1];

    if (token) {

        const decodedToken = jwt_decode<MyToken>(token);
        if (decodedToken.admin) {
            next();
        } else {
            return res.status(401).json({
                message: 'You need to be an ADMIN user!!!'
            });
        }
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};


export default verifyAdmin;
