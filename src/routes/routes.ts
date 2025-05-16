import express from "express"
import { DriverController } from "../controller/driver"
const routes = express.Router()


routes.get("/salary/driver/list",DriverController.GetAllSalaryDriver)

export default routes