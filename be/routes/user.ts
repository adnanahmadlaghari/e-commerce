import {Router} from "express";
import { deleteUser, getallUsers, updateUser } from "../controller/user";
const userRoute = Router()

userRoute.get("/", getallUsers)
userRoute.patch("/", updateUser)
userRoute.delete("/", deleteUser)

export {userRoute}