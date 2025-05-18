import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";
import { RequestGetDriverList } from "../dto/requests/driver";


export class DriverServices {

static GetCountDriver() {
    return prisma.drivers.count()
}

static GetAllDriver(req: RequestGetDriverList) {
  const offset = (req.current - 1) * req.page_size;
  const hasFilter = (value: any) => value !== undefined && value !== null && value !== '';

  return prisma.$queryRaw`
    WITH filtered_shipments AS (
      SELECT s.shipment_no, s.shipment_date
      FROM shipments s
      WHERE 1=1
      ${hasFilter(req.year) ? Prisma.sql`AND TO_CHAR(s.shipment_date, 'YYYY') = ${String(req.year)}` : Prisma.empty}
      ${hasFilter(req.month) ? Prisma.sql`AND TO_CHAR(s.shipment_date, 'MM') = ${String(req.month).padStart(2, '0')}` : Prisma.empty}
    ),
    filtered_attendances AS (
      SELECT da.driver_code, da.attendance_date
      FROM driver_attendances da
      WHERE da.attendance_status = 'true'
      ${hasFilter(req.year) ? Prisma.sql`AND TO_CHAR(da.attendance_date, 'YYYY') = ${String(req.year)}` : Prisma.empty}
      ${hasFilter(req.month) ? Prisma.sql`AND TO_CHAR(da.attendance_date, 'MM') = ${String(req.month).padStart(2, '0')}` : Prisma.empty}
    ),
    shipment_salary AS (
      SELECT 
        sc.driver_code,
        SUM(sc.total_costs) FILTER (WHERE sc.cost_status = 'PENDING') AS total_pending,
        SUM(sc.total_costs) FILTER (WHERE sc.cost_status = 'CONFIRMED') AS total_confirmed,
        SUM(sc.total_costs) FILTER (WHERE sc.cost_status = 'PAID') AS total_paid
      FROM shipment_costs sc
      ${hasFilter(req.year) || hasFilter(req.month) ? Prisma.sql`
        JOIN filtered_shipments fs ON sc.shipment_no = fs.shipment_no
      ` : Prisma.empty}
      GROUP BY sc.driver_code
    ),
    attendance_count AS (
      SELECT
        driver_code,
        COUNT(*) AS total_attendance
      FROM filtered_attendances
      GROUP BY driver_code
    ),
    driver_attendance_salary AS (
      SELECT
        ac.driver_code,
        ac.total_attendance * vc.value AS total_attendance_salary
      FROM attendance_count ac
      CROSS JOIN (
        SELECT value FROM variable_configs WHERE key = 'DRIVER_MONTHLY_ATTENDANCE_SALARY'
      ) vc
    ),
    driver_total_salary AS (
      SELECT 
        d.driver_code,
        COALESCE(das.total_attendance_salary, 0) +
        COALESCE(ss.total_pending, 0) +
        COALESCE(ss.total_confirmed, 0) +
        COALESCE(ss.total_paid, 0) AS total_salary
      FROM drivers d
      LEFT JOIN driver_attendance_salary das ON d.driver_code = das.driver_code
      LEFT JOIN shipment_salary ss ON d.driver_code = ss.driver_code
    ),
    driver_count_shipment AS (
      SELECT
        d.driver_code,
        COUNT(DISTINCT s.shipment_no) AS count_shipment
      FROM drivers d 
      LEFT JOIN shipment_costs sc ON d.driver_code = sc.driver_code 
      LEFT JOIN shipments s ON sc.shipment_no = s.shipment_no
        AND s.shipment_status IN ('RUNNING', 'DONE')
      ${hasFilter(req.year) || hasFilter(req.month) ? Prisma.sql`
        JOIN filtered_shipments fs ON s.shipment_no = fs.shipment_no
      ` : Prisma.empty}
      GROUP BY d.driver_code
    ),
    driver_date_time AS (
      SELECT 
        d.driver_code,
        TO_CHAR(MAX(s.shipment_date), 'YYYY') AS year_date,
        TO_CHAR(MAX(s.shipment_date), 'MM') AS month_date
      FROM drivers d
      LEFT JOIN shipment_costs sc ON d.driver_code = sc.driver_code 
      LEFT JOIN shipments s ON sc.shipment_no = s.shipment_no
      ${hasFilter(req.year) || hasFilter(req.month) ? Prisma.sql`
        JOIN filtered_shipments fs ON s.shipment_no = fs.shipment_no
      ` : Prisma.empty}
      GROUP BY d.driver_code
    )

    SELECT 
      d.name,
      d.driver_code,
      COALESCE(CAST(ss.total_pending AS INTEGER), 0) AS total_pending,
      COALESCE(CAST(ss.total_confirmed AS INTEGER), 0) AS total_confirmed,
      COALESCE(CAST(ss.total_paid AS INTEGER), 0) AS total_paid,
      COALESCE(CAST(das.total_attendance_salary AS INTEGER), 0) AS total_attendance_salary,
      COALESCE(CAST(dts.total_salary AS INTEGER), 0) AS total_salary,
      COALESCE(CAST(dcs.count_shipment AS INTEGER), 0) AS count_shipment
    FROM drivers d 
    LEFT JOIN shipment_salary ss ON d.driver_code = ss.driver_code
    LEFT JOIN driver_attendance_salary das ON d.driver_code = das.driver_code
    LEFT JOIN driver_total_salary dts ON d.driver_code = dts.driver_code
    LEFT JOIN driver_count_shipment dcs ON d.driver_code = dcs.driver_code 
    LEFT JOIN driver_date_time ddt ON d.driver_code = ddt.driver_code
${(hasFilter(req.year) || hasFilter(req.month) || hasFilter(req.driver_code) || hasFilter(req.name)) ? Prisma.sql`
  WHERE
    ${(() => {
      const conditions = [];
      
      if (hasFilter(req.year) || hasFilter(req.month)) {
        conditions.push(Prisma.sql`(
          EXISTS (
            SELECT 1 FROM filtered_shipments fs
            JOIN shipment_costs sc ON fs.shipment_no = sc.shipment_no
            WHERE sc.driver_code = d.driver_code
          )
          OR EXISTS (
            SELECT 1 FROM filtered_attendances fa
            WHERE fa.driver_code = d.driver_code
          )
        )`);
      }
      
      if (hasFilter(req.driver_code)) {
        conditions.push(Prisma.sql`d.driver_code = ${req.driver_code}`);
      }
      
      if (hasFilter(req.name)) {
        conditions.push(Prisma.sql`(
          d.name = ${req.name} OR  -- Exact match
          d.name ILIKE ${`${req.name} %`} OR  -- Diawali dengan nama (termasuk dengan tambahan teks setelahnya)
          d.name ILIKE ${`% ${req.name}`} OR  -- Diakhiri dengan nama
          d.name ILIKE ${`% ${req.name} %`}  -- Nama sebagai kata terpisah
        )`);
      }

      if (conditions.length === 1) {
        return conditions[0];
      }
    
      if (conditions.length > 1) {
        return conditions.reduce((acc, sql) => acc ? Prisma.sql`${acc} OR ${sql}` : sql, Prisma.empty);
      }
      
      return Prisma.empty;
    })()}
` : Prisma.empty}

    ORDER BY d.name ASC
    LIMIT ${req.page_size} OFFSET ${offset};
  `;
}
}