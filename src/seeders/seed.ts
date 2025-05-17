import { prisma } from '../utils/prisma';
import { seedDriversAttendances } from './driver_attendances';
import { seedDrivers } from './drivers';
import { seedShipmentCosts } from './shipment_costs';
import { seedShipment } from './shipments';
import { seedVariableConfigs } from './variable_configs';


async function main() {
  await seedDrivers();
  await seedDriversAttendances();
  await seedShipment();
  await seedShipmentCosts();
  await seedVariableConfigs();
}

main()
  .then(() => {
    console.log('Seeding selesai.');
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error('Seeding gagal:', e);
    prisma.$disconnect();
    process.exit(1);
  });
