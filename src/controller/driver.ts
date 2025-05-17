import { Request, Response } from "express";

import { DriverUseCase } from "../usecase/driver";
import { bigintToString } from "../utils/convertBigInt";
import { RequestGetDriverList } from "../dto/requests/driver";

export class DriverController {
static async GetAllSalaryDriver(req: Request, res: Response) {
  try {
    const requestList: RequestGetDriverList = {
      month: req.query.month ? String(req.query.month) : undefined,
      year: req.query.year ? Number(req.query.year) : undefined,
      current: Number(req.query.current ?? 1),
      page_size: Number(req.query.page_size ?? 10),
      driver_code: req.query.driver_code ? String(req.query.driver_code) : undefined,
      status: req.query.status ? String(req.query.status) : undefined,
      name: req.query.name ? String(req.query.name) : undefined
    };
    const data = await DriverUseCase.GetAllSalaryDriver(requestList);
    return res.status(200).json({
        data: bigintToString(data.driver),
        pagination: {
          total_row: data.total_row,
          current_page: data.current,
          per_page: data.page_size,
          total_page: Math.ceil(data.total_row / Number(data.page_size))
        }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error
    });
  }
}
}