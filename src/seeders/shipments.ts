import fs from 'fs';
import csv from 'csv-parser';
import { prisma } from '../utils/prisma';


export async function seedShipment() {
  const results: any[] = [];

  return new Promise<void>((resolve, reject) => {
    fs.createReadStream('public/uploads/shipments.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        for (const row of results) {
            console.log(row)
          await prisma.shipments.create({
            data: {
                shipment_no : row.shipment_no,
                shipment_date : new Date(row.shipment_date),
                shipment_status : row.shipment_status
            },
          });
        }
        console.log('Seeded drivers');
        resolve();
      })
      .on('error', reject);
  });
}