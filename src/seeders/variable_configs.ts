import fs from 'fs';
import csv from 'csv-parser';
import { prisma } from '../utils/prisma';


export async function seedVariableConfigs() {
  const results: any[] = [];

  return new Promise<void>((resolve, reject) => {
    fs.createReadStream('public/uploads/variable_configs.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        for (const row of results) {
            console.log(row)
          await prisma.variable_configs.create({
            data: {
                key : row.key,
                value : Number(row.value)
            },
          });
        }
        console.log('Seeded drivers');
        resolve();
      })
      .on('error', reject);
  });
}