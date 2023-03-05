-- CreateTable
CREATE TABLE `user_table` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pro_img` VARCHAR(191) NOT NULL DEFAULT '',
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `credit` INTEGER NOT NULL DEFAULT 0,
    `rep` INTEGER NOT NULL,

    UNIQUE INDEX `user_table_name_key`(`name`),
    UNIQUE INDEX `user_table_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
