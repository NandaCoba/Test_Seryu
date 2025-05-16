import fs from 'fs';
import csv from 'csv-parser';
import { prisma } from '../utils/prisma';


export async function seedShipmentCosts() {
  const results: any[] = [];

  return new Promise<void>((resolve, reject) => {
    fs.createReadStream('public/uploads/shipment_costs.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        for (const row of results) {
            console.log(row)
          await prisma.shipment_costs.create({
            data: {
                driver_code : row.driver_code,
                shipment_no : row.shipment_no,
                total_costs : row.total_costs,
                cost_status : row.cost_status
            },
          });
        }
        console.log('Seeded drivers');
        resolve();
      })
      .on('error', reject);
  });
}