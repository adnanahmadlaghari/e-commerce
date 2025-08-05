import {Router} from "express";
import { register, Login } from "../controller/auth";
const authRoute = Router()

authRoute.post("/register", register)
authRoute.post("/login",Login)

export {authRoute}