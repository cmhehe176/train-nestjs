/*
  Warnings:

  - A unique constraint covering the columns `[classID]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `classID` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "classID" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Subject_classID_key" ON "Subject"("classID");

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
