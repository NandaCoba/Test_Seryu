import { RequestGetDriverList } from "../dto/requests/driver";
import { prisma } from "../utils/prisma";


export class DriverServices {

static GetCountDriver() {
    return prisma.drivers.count()
}

static GetAllDrver(req: RequestGetDriverList) {
  const offset = (req.current - 1) * req.page_size;
  const month = req.month ?? null;
  const year = req.year ?? null;

  return prisma.$queryRaw`
    WITH monthly_salary AS (
      SELECT value::numeric FROM variable_configs WHERE key = 'DRIVER_MONTHLY_ATTENDANCE_SALARY'
    )
    SELECT
      d.name,
      d.driver_code,
      TO_CHAR(da.attendance_date, 'YYYY-MM-DD') AS attendance_date,
      COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs END), 0) AS total_pending,
      COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs END), 0) AS total_paid,
      COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs END), 0) AS total_confirmed,
      (SELECT value FROM monthly_salary) * COUNT(NULLIF(da.attendance_status, false)) AS total_attendance_salary,
      (
        COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs END), 0) +
        COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs END), 0) +
        COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs END), 0) +
        (SELECT value FROM monthly_salary) * COUNT(NULLIF(da.attendance_status, false))
      ) AS total_salary,
      COUNT(DISTINCT CASE WHEN sh.shipment_status != 'CANCELLED' THEN sc.shipment_no ELSE NULL END) AS count_shipment
    FROM drivers d
    LEFT JOIN shipment_costs sc ON d.driver_code = sc.driver_code
    LEFT JOIN shipments sh ON sc.shipment_no = sh.shipment_no
    LEFT JOIN driver_attendances da ON d.driver_code = da.driver_code
    WHERE
      (${year} IS NULL OR EXTRACT(YEAR FROM da.attendance_date) = ${year}) AND
      (${month} IS NULL OR EXTRACT(MONTH FROM da.attendance_date) = ${month})
    GROUP BY d.driver_code, d.name, da.attendance_date
    LIMIT ${req.page_size} OFFSET ${offset};
  `;
}


}