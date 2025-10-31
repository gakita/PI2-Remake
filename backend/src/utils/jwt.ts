import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET;

export const generateJWT = (user: any) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name,
    }, secret!, {
        expiresIn: "1d",
    });
};

export const verifyJWT = (token: string) => {
    return jwt.verify(token, secret! as string);
};
