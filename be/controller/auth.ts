import { PrismaClient } from "../prisma/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";
import type { Request, Response } from "express";
import argon from "argon2";
var jwt = require("jsonwebtoken");

const prisma = new PrismaClient().$extends(withAccelerate());

type userT = {
  id: number;
  email: string;
  name: string;
  username: string;
};

// const generateToken = (user: userT) => {
//   const data = {
//     _id: user.id,
//     email: user.email,
//     name: user.name,
//     username: user.username,
//   };
//   const accessToken = jwt.sign(
//     {
//       data,
//     },
//     "jwtsecret",
//     { expiresIn: "1h" }
//   );

//   const refreshToken = jwt.sign(
//     {
//       data,
//     },
//     "jwtsecret",
//     { expiresIn: "15d" }
//   );

//   return { accessToken, refreshToken };
// };

const register = async (req: Request, res: Response) => {
  try {
    const { email, name, username, password } = req.body;
    if (!email || !name || !username || !password) {
      return res
        .status(404)
        .json({ message: "Email, Username, Name or Password is missing" });
    }
    const hashed_password = await argon.hash(password);
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        username: username,
        password: hashed_password,
      },
    });

    const accessToken = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
      },
      "jwtsecret",
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
      },
      "jwtsecret",
      { expiresIn: "15d" }
    );

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({
      error: { error },
      message: "Internal Server Error",
    });
  }
};

const Login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(404)
        .json({ message: "Username or Password is missing" });
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User does't exist!" });
    }

    const isPasswordValid = await argon.verify(user.password, password)

    if(!isPasswordValid){
        return res.status(401).json({message: "Invalid Credentials"})
    }

    const accessToken = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
      },
      "jwtsecret",
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
      },
      "jwtsecret",
      { expiresIn: "15d" }
    );

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({
      error: { error },
      message: "Internal Server Error",
    });
  }
};

export { register, Login };
