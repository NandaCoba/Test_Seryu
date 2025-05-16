/*
  Warnings:

  - The primary key for the `driver_attendances` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Attendance_Date` on the `driver_attendances` table. All the data in the column will be lost.
  - You are about to drop the column `Attendance_status` on the `driver_attendances` table. All the data in the column will be lost.
  - You are about to drop the column `Driver_Code` on the `driver_attendances` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `driver_attendances` table. All the data in the column will be lost.
  - The primary key for the `drivers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Driver_Code` on the `drivers` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `drivers` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `drivers` table. All the data in the column will be lost.
  - The primary key for the `shipment_costs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Cost_Status` on the `shipment_costs` table. All the data in the column will be lost.
  - You are about to drop the column `Driver_Code` on the `shipment_costs` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `shipment_costs` table. All the data in the column will be lost.
  - You are about to drop the column `Shipment_No` on the `shipment_costs` table. All the data in the column will be lost.
  - You are about to drop the column `Total_Costs` on the `shipment_costs` table. All the data in the column will be lost.
  - The primary key for the `shipments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Shipment_Date` on the `shipments` table. All the data in the column will be lost.
  - You are about to drop the column `Shipment_No` on the `shipments` table. All the data in the column will be lost.
  - You are about to drop the column `Shipment_Status` on the `shipments` table. All the data in the column will be lost.
  - The primary key for the `variable_configs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Key` on the `variable_configs` table. All the data in the column will be lost.
  - You are about to drop the column `Value` on the `variable_configs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[driver_code,attendance_date]` on the table `driver_attendances` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[driver_code]` on the table `drivers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[driver_code,shipment_no]` on the table `shipment_costs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `attendance_date` to the `driver_attendances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attendance_status` to the `driver_attendances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driver_code` to the `driver_attendances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driver_code` to the `drivers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `drivers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cost_status` to the `shipment_costs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driver_code` to the `shipment_costs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipment_no` to the `shipment_costs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_costs` to the `shipment_costs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipment_date` to the `shipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipment_no` to the `shipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipment_status` to the `shipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `variable_configs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `variable_configs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "driver_attendances" DROP CONSTRAINT "driver_attendances_Driver_Code_fkey";

-- DropForeignKey
ALTER TABLE "shipment_costs" DROP CONSTRAINT "shipment_costs_Driver_Code_fkey";

-- DropForeignKey
ALTER TABLE "shipment_costs" DROP CONSTRAINT "shipment_costs_Shipment_No_fkey";

-- DropIndex
DROP INDEX "driver_attendances_Driver_Code_Attendance_Date_key";

-- DropIndex
DROP INDEX "drivers_Driver_Code_key";

-- DropIndex
DROP INDEX "shipment_costs_Driver_Code_Shipment_No_key";

-- AlterTable
ALTER TABLE "driver_attendances" DROP CONSTRAINT "driver_attendances_pkey",
DROP COLUMN "Attendance_Date",
DROP COLUMN "Attendance_status",
DROP COLUMN "Driver_Code",
DROP COLUMN "Id",
ADD COLUMN     "attendance_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "attendance_status" BOOLEAN NOT NULL,
ADD COLUMN     "driver_code" VARCHAR(255) NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "driver_attendances_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "drivers" DROP CONSTRAINT "drivers_pkey",
DROP COLUMN "Driver_Code",
DROP COLUMN "Id",
DROP COLUMN "Name",
ADD COLUMN     "driver_code" VARCHAR(255) NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD CONSTRAINT "drivers_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "shipment_costs" DROP CONSTRAINT "shipment_costs_pkey",
DROP COLUMN "Cost_Status",
DROP COLUMN "Driver_Code",
DROP COLUMN "Id",
DROP COLUMN "Shipment_No",
DROP COLUMN "Total_Costs",
ADD COLUMN     "cost_status" "CostStatus" NOT NULL,
ADD COLUMN     "driver_code" VARCHAR(255) NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "shipment_no" VARCHAR(255) NOT NULL,
ADD COLUMN     "total_costs" DECIMAL(65,30) NOT NULL,
ADD CONSTRAINT "shipment_costs_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "shipments" DROP CONSTRAINT "shipments_pkey",
DROP COLUMN "Shipment_Date",
DROP COLUMN "Shipment_No",
DROP COLUMN "Shipment_Status",
ADD COLUMN     "shipment_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "shipment_no" VARCHAR(255) NOT NULL,
ADD COLUMN     "shipment_status" "ShipmentStatus" NOT NULL,
ADD CONSTRAINT "shipments_pkey" PRIMARY KEY ("shipment_no");

-- AlterTable
ALTER TABLE "variable_configs" DROP CONSTRAINT "variable_configs_pkey",
DROP COLUMN "Key",
DROP COLUMN "Value",
ADD COLUMN     "key" VARCHAR(255) NOT NULL,
ADD COLUMN     "value" INTEGER NOT NULL,
ADD CONSTRAINT "variable_configs_pkey" PRIMARY KEY ("key");

-- CreateIndex
CREATE UNIQUE INDEX "driver_attendances_driver_code_attendance_date_key" ON "driver_attendances"("driver_code", "attendance_date");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_driver_code_key" ON "drivers"("driver_code");

-- CreateIndex
CREATE UNIQUE INDEX "shipment_costs_driver_code_shipment_no_key" ON "shipment_costs"("driver_code", "shipment_no");

-- AddForeignKey
ALTER TABLE "driver_attendances" ADD CONSTRAINT "driver_attendances_driver_code_fkey" FOREIGN KEY ("driver_code") REFERENCES "drivers"("driver_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipment_costs" ADD CONSTRAINT "shipment_costs_driver_code_fkey" FOREIGN KEY ("driver_code") REFERENCES "drivers"("driver_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipment_costs" ADD CONSTRAINT "shipment_costs_shipment_no_fkey" FOREIGN KEY ("shipment_no") REFERENCES "shipments"("shipment_no") ON DELETE RESTRICT ON UPDATE CASCADE;
