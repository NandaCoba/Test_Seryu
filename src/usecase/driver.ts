
import { RequestGetDriverList } from "../dto/requests/driver";
import { DriverServices } from "../services/driver"

export class DriverUseCase {

static async GetAllSalaryDriver(req: RequestGetDriverList) {
  try {
    const [count, driver] = await Promise.all([
      DriverServices.GetCountDriver(), 
      DriverServices.GetAllDriver(req)
    ]);
    return {
      driver, 
      total_row: Number(count),
      current: req.current,
      page_size: req.page_size
    };
  } catch (error: any) {
    console.error('Error in GetAllSalaryDriver:', error);
    throw error; 
  }
}

}