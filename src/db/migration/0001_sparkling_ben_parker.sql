PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_t_invoice` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text DEFAULT 'BILL' NOT NULL,
	`due_date` integer NOT NULL,
	`issued_date` integer NOT NULL,
	`issuer` text NOT NULL,
	`invoice_code` text NOT NULL,
	`amount` integer NOT NULL,
	`family_id` text NOT NULL,
	`status` text DEFAULT 'UNPAID' NOT NULL,
	FOREIGN KEY (`family_id`) REFERENCES `t_family`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_t_invoice`("id", "type", "due_date", "issued_date", "issuer", "invoice_code", "amount", "family_id", "status") SELECT "id", "type", "due_date", "issued_date", "issuer", "invoice_code", "amount", "family_id", "status" FROM `t_invoice`;--> statement-breakpoint
DROP TABLE `t_invoice`;--> statement-breakpoint
ALTER TABLE `__new_t_invoice` RENAME TO `t_invoice`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_t_family` (
	`id` text PRIMARY KEY NOT NULL,
	`house` text NOT NULL,
	`funds` integer DEFAULT 0 NOT NULL,
	`email` text NOT NULL,
	`passkey` text NOT NULL,
	`shopping_list_id` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_t_family`("id", "house", "funds", "email", "passkey", "shopping_list_id") SELECT "id", "house", "funds", "email", "passkey", "shopping_list_id" FROM `t_family`;--> statement-breakpoint
DROP TABLE `t_family`;--> statement-breakpoint
ALTER TABLE `__new_t_family` RENAME TO `t_family`;--> statement-breakpoint
CREATE UNIQUE INDEX `t_family_house_unique` ON `t_family` (`house`);--> statement-breakpoint
CREATE UNIQUE INDEX `t_family_email_unique` ON `t_family` (`email`);--> statement-breakpoint
CREATE TABLE `__new_t_shopping_list` (
	`id` text PRIMARY KEY NOT NULL,
	`max_amount_to_spend` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_t_shopping_list`("id", "max_amount_to_spend") SELECT "id", "max_amount_to_spend" FROM `t_shopping_list`;--> statement-breakpoint
DROP TABLE `t_shopping_list`;--> statement-breakpoint
ALTER TABLE `__new_t_shopping_list` RENAME TO `t_shopping_list`;--> statement-breakpoint
CREATE TABLE `__new_t_shopping_list_item` (
	`id` text PRIMARY KEY NOT NULL,
	`shopping_list_id` text NOT NULL,
	`product_name` text NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL,
	FOREIGN KEY (`shopping_list_id`) REFERENCES `t_shopping_list`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_t_shopping_list_item`("id", "shopping_list_id", "product_name", "quantity") SELECT "id", "shopping_list_id", "product_name", "quantity" FROM `t_shopping_list_item`;--> statement-breakpoint
DROP TABLE `t_shopping_list_item`;--> statement-breakpoint
ALTER TABLE `__new_t_shopping_list_item` RENAME TO `t_shopping_list_item`;