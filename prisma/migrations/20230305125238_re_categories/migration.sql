-- CreateTable
CREATE TABLE `poke_table` (
    `id` INTEGER NOT NULL,
    `en_name` VARCHAR(191) NOT NULL,
    `ko_name` VARCHAR(191) NOT NULL,
    `en_type` VARCHAR(191) NOT NULL,
    `ko_type` VARCHAR(191) NOT NULL,
    `card_url` VARCHAR(191) NOT NULL,
    `motion_url` VARCHAR(191) NOT NULL,
    `stats` VARCHAR(191) NOT NULL,
    `credit` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
