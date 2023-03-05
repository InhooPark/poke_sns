/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `user_table` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_table_email_key` ON `user_table`(`email`);
