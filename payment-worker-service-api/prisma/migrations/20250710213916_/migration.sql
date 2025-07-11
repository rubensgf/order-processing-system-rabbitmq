-- CreateTable
CREATE TABLE `PaymentBatch` (
    `batch_id` VARCHAR(191) NOT NULL,
    `received_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `raw_data` JSON NOT NULL,
    `status` ENUM('PENDING', 'SEND', 'PAID', 'FAILED', 'END') NOT NULL DEFAULT 'PENDING',

    PRIMARY KEY (`batch_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `payment_id` VARCHAR(191) NOT NULL,
    `batch_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `tokenCard` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'SEND', 'PAID', 'FAILED', 'END') NOT NULL DEFAULT 'PENDING',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Payment_batch_id_idx`(`batch_id`),
    PRIMARY KEY (`payment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_batch_id_fkey` FOREIGN KEY (`batch_id`) REFERENCES `PaymentBatch`(`batch_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
