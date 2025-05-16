import fs from 'fs';
import csv from 'csv-parser';
import { prisma } from '../utils/prisma';


export async function seedDriversAttendances() {
  const results: any[] = [];

  return new Promise<void>((resolve, reject) => {
    fs.createReadStream('public/uploads/driver_attendances.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        for (const row of results) {
          await prisma.driver_attendances.create({
            data: {
                driver_code : row.driver_code,
                attendance_date : new Date(row.attendance_date),
                attendance_status : Boolean(row.attendance_status)
            },
          });
        }
        console.log('Seeded drivers');
        resolve();
      })
      .on('error', reject);
  });
}