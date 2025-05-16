import fs from 'fs';
import csv from 'csv-parser';
import { prisma } from '../utils/prisma';


export async function seedDrivers() {
  const results: any[] = [];

  return new Promise<void>((resolve, reject) => {
    fs.createReadStream('public/uploads/drivers.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        for (const row of results) {
            console.log(row)
          await prisma.drivers.create({
            data: {
              id: Number(row.id),
              name: row.name,
              driver_code : row.driver_code,
            },
          });
        }
        console.log('Seeded drivers');
        resolve();
      })
      .on('error', reject);
  });
}