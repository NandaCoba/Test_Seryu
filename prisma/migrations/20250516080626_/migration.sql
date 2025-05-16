-- CreateEnum
CREATE TYPE "ShipmentStatus" AS ENUM ('RUNNING', 'DONE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CostStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PAID');

-- CreateTable
CREATE TABLE "drivers" (
    "Id" SERIAL NOT NULL,
    "Driver_Code" VARCHAR(255) NOT NULL,
    "Name" VARCHAR(255) NOT NULL,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "driver_attendances" (
    "Id" SERIAL NOT NULL,
    "Driver_Code" VARCHAR(255) NOT NULL,
    "Attendance_Date" TIMESTAMP(3) NOT NULL,
    "Attendance_status" BOOLEAN NOT NULL,

    CONSTRAINT "driver_attendances_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "shipments" (
    "Shipment_No" VARCHAR(255) NOT NULL,
    "Shipment_Date" TIMESTAMP(3) NOT NULL,
    "Shipment_Status" "ShipmentStatus" NOT NULL,

    CONSTRAINT "shipments_pkey" PRIMARY KEY ("Shipment_No")
);

-- CreateTable
CREATE TABLE "shipment_costs" (
    "Id" SERIAL NOT NULL,
    "Driver_Code" VARCHAR(255) NOT NULL,
    "Shipment_No" VARCHAR(255) NOT NULL,
    "Total_Costs" DECIMAL(65,30) NOT NULL,
    "Cost_Status" "CostStatus" NOT NULL,

    CONSTRAINT "shipment_costs_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "variable_configs" (
    "Key" VARCHAR(255) NOT NULL,
    "Value" INTEGER NOT NULL,

    CONSTRAINT "variable_configs_pkey" PRIMARY KEY ("Key")
);

-- CreateIndex
CREATE UNIQUE INDEX "drivers_Driver_Code_key" ON "drivers"("Driver_Code");

-- CreateIndex
CREATE UNIQUE INDEX "driver_attendances_Driver_Code_Attendance_Date_key" ON "driver_attendances"("Driver_Code", "Attendance_Date");

-- CreateIndex
CREATE UNIQUE INDEX "shipment_costs_Driver_Code_Shipment_No_key" ON "shipment_costs"("Driver_Code", "Shipment_No");

-- AddForeignKey
ALTER TABLE "driver_attendances" ADD CONSTRAINT "driver_attendances_Driver_Code_fkey" FOREIGN KEY ("Driver_Code") REFERENCES "drivers"("Driver_Code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipment_costs" ADD CONSTRAINT "shipment_costs_Driver_Code_fkey" FOREIGN KEY ("Driver_Code") REFERENCES "drivers"("Driver_Code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipment_costs" ADD CONSTRAINT "shipment_costs_Shipment_No_fkey" FOREIGN KEY ("Shipment_No") REFERENCES "shipments"("Shipment_No") ON DELETE RESTRICT ON UPDATE CASCADE;
