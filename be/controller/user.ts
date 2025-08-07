import { PrismaClient } from "../prisma/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";
import type { Request, Response } from "express";
import argon from "argon2"
const prisma = new PrismaClient().$extends(withAccelerate());

const getallUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({});

    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({
      error: { error },
      message: "Internal Server Error",
    });
  }
};

const updateUser = async (req: any, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const { id } = req.user;
    const {name, email, username, password} = req.body
    const hashedPassword = await argon.hash(password)
    const users = await prisma.user.update({
      where: {
        id: id,
      }, 
      data: {
        name: name,
        email: email,
        username: username,
        password: hashedPassword
      }
    });

    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({
      error: { error },
      message: "Internal Server Error",
    });
  }
};


const deleteUser = async (req: any, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const { id } = req.user;
    const users = await prisma.user.delete({
      where: {
        id: id,
      }
    });

    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({
      error: { error },
      message: "Internal Server Error",
    });
  }
};

export { getallUsers, updateUser, deleteUser };
