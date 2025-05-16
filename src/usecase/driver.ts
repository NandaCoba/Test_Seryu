import { RequestGetDriverList } from "../dto/requests/driver"
import { ResponseDataSalaryItems, ResponsesGetDriverList } from "../dto/responses/driver"
import { DriverServices } from "../services/driver"



export class DriverUseCase {

static async GetAllSalaryDriver(req: RequestGetDriverList) {
  try {
    let query: any = await DriverServices.GetAllDrver(req);
    let count: any = await DriverServices.GetCountDriver();


    const data = query.map((items: any) => {
    const date = new Date(Number(items.attendance_date));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return {
      ...items,
      total_pending: parseFloat(items.total_pending),
      total_paid: parseFloat(items.total_paid),
      total_confirmed: parseFloat(items.total_confirmed),
      total_attendance_salary: parseFloat(items.total_attendance_salary),
      total_salary: parseFloat(items.total_salary),
      count_shipment: Number(items.count_shipment),
      attendance_date: items.attendance_date,
      _filter_year: year,
      _filter_month: month,
    };
  })
  .filter((item: any) => {
    const filterMonth = req.month;
    const filterYear = req.year;

    if (filterMonth && filterYear) {
      return item._filter_month === filterMonth && item._filter_year === filterYear;
    } else if (filterMonth) {
      return item._filter_month === filterMonth;
    } else if (filterYear) {
      return item._filter_year === filterYear;
    }
    return true; // Tidak ada filter
  })
  .map(({ _filter_year, _filter_month, ...rest }: any) => rest);


    return {
      data,
      total_row: count,
      current: req.current,
      page_size: req.page_size
    };
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}




}