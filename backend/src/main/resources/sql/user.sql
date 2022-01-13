DROP SCHEMA IF EXISTS  `ssafy_web_db`;

CREATE SCHEMA IF NOT EXISTS `ssafy_web_db` DEFAULT CHARACTER SET utf8 ;
USE `ssafy_web_db` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user` (
  `id` BIGINT AUTO_INCREMENT,
  `user_id` VARCHAR(50) NOT NULL,
  `user_pw` VARCHAR(100) NOT NULL,
  `user_name` VARCHAR(50) NULL,
  `user_img` VARCHAR(50) NULL,
  `user_birth` VARCHAR(50) NULL,
  `user_interests` VARCHAR(50) NULL,
  `user_det` VARCHAR (50) NULL,
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB;

commit;