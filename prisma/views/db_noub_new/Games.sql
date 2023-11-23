SELECT
  `nomb_games`.`games`.`id` AS `id`,
  `nomb_games`.`games`.`name` AS `name`,
  `nomb_games`.`games`.`player_min` AS `player_min`,
  `nomb_games`.`games`.`player_max` AS `player_max`,
  `nomb_games`.`games`.`player_age` AS `player_age`,
  `nomb_games`.`games`.`short_description` AS `short_description`,
  `nomb_games`.`games`.`full_description` AS `full_description`,
  `nomb_games`.`games`.`cover_file` AS `cover_file`,
  `nomb_games`.`games`.`rules_file` AS `rules_file`,
  `nomb_games`.`games`.`genres` AS `genres`,
  `nomb_games`.`games`.`game_duration` AS `game_duration`,
  `nomb_games`.`games`.`game_year` AS `game_year`,
  `nomb_games`.`games`.`status` AS `status`,
  `nomb_games`.`games`.`place` AS `place`,
  `nomb_games`.`games`.`comment` AS `comment`,
  `nomb_games`.`games`.`status_desc` AS `status_desc`
FROM
  `nomb_games`.`games`