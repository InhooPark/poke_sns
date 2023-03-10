-- DropIndex
DROP INDEX `user_table_email_key` ON `user_table`;

-- DropIndex
DROP INDEX `user_table_name_key` ON `user_table`;

-- AlterTable
ALTER TABLE `user_table` MODIFY `pro_img` VARCHAR(191) NOT NULL DEFAULT '000',
    MODIFY `name` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `rep` INTEGER NOT NULL DEFAULT 0;
