import { PrismaClient } from "../prisma/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";
import type { Request, Response } from "express";

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

export {getallUsers}