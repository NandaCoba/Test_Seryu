import { Request, Response } from "express";
import { RequestGetDriverList } from "../dto/requests/driver";
import { DriverUseCase } from "../usecase/driver";
import { bigintToString } from "../utils/convertBigInt";

export class DriverController {
static async GetAllSalaryDriver(req: Request, res: Response) {
  try {
    const requestList: RequestGetDriverList = {
      month: Number(req.query.month ?? null),
      year: Number(req.query.year ?? null),
      current: Number(req.query.current ?? 1),
      page_size: Number(req.query.page_size ?? 10),
    };
    const data = await DriverUseCase.GetAllSalaryDriver(requestList);
    const finalResult = bigintToString(data)
    return res.status(200).json(finalResult);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}




}