import {Router} from "express";
import { getallUsers } from "../controller/user";
const userRoute = Router()

userRoute.get("/", getallUsers)

export {userRoute}