SELECT
  `nomb_games`.`g_view`.`id` AS `id`,
  `nomb_games`.`g_view`.`name` AS `name`,
  `nomb_games`.`g_view`.`player_min` AS `player_min`,
  `nomb_games`.`g_view`.`player_max` AS `player_max`,
  `nomb_games`.`g_view`.`player_age` AS `player_age`,
  `nomb_games`.`g_view`.`short_description` AS `short_description`,
  `nomb_games`.`g_view`.`full_description` AS `full_description`,
  `nomb_games`.`g_view`.`cover_file` AS `cover_file`,
  `nomb_games`.`g_view`.`rules_file` AS `rules_file`,
  `nomb_games`.`g_view`.`genres` AS `genres`,
  `nomb_games`.`g_view`.`game_duration` AS `game_duration`,
  `nomb_games`.`g_view`.`game_year` AS `game_year`,
  `nomb_games`.`g_view`.`status` AS `status`,
  `nomb_games`.`g_view`.`place` AS `place`,
  `nomb_games`.`g_view`.`comment` AS `comment`,
  `nomb_games`.`g_view`.`status_desc` AS `status_desc`
FROM
  `nomb_games`.`g_view`