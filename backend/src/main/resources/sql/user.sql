DROP SCHEMA IF EXISTS  `ssafy_web_db`;

CREATE SCHEMA IF NOT EXISTS `ssafy_web_db` DEFAULT CHARACTER SET utf8 ;
USE `ssafy_web_db` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user` (
  `id` BIGINT AUTO_INCREMENT,
  `position` VARCHAR(50) NULL,
  `department` VARCHAR(50) NULL,
  `name` VARCHAR(50) NULL,
  `user_id` VARCHAR(50) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB;

commit;