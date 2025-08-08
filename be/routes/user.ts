import {Router} from "express";
import { deleteUser, getallUsers, updateUser } from "../controller/user";
import pagination_middleware from "../middleware/pagination";

const userRoute = Router()

userRoute.get("/", pagination_middleware(3), getallUsers)
userRoute.patch("/", updateUser)
userRoute.delete("/", deleteUser)

export {userRoute}