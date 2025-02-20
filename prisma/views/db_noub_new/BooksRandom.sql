SELECT
  `new_book`.`id` AS `id`,
  `new_book`.`title` AS `title`,
  `new_book`.`desc` AS `desc`,
  `new_book`.`content` AS `content`,
  `new_book`.`fileId` AS `fileId`,
  `new_book`.`createdAt` AS `createdAt`,
  `new_book`.`isDeleted` AS `isDeleted`
FROM
  (
    SELECT
      `db_noub_new`.`Book`.`id` AS `id`,
      `db_noub_new`.`Book`.`title` AS `title`,
      `db_noub_new`.`Book`.`desc` AS `desc`,
      `db_noub_new`.`Book`.`content` AS `content`,
      `db_noub_new`.`Book`.`fileId` AS `fileId`,
      `db_noub_new`.`Book`.`createdAt` AS `createdAt`,
      `db_noub_new`.`Book`.`isDeleted` AS `isDeleted`
    FROM
      `db_noub_new`.`Book`
    WHERE
      `db_noub_new`.`Book`.`isDeleted` = 0
    ORDER BY
      `db_noub_new`.`Book`.`createdAt` DESC
    LIMIT
      15
  ) `new_book`
ORDER BY
  rand()