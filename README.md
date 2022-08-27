# Infomania backend

- [Установка зависимостей](#Установка)
- [Запуск приложения](#Запуск)

## Описание проекта

[API description.](http://api.infomania.ru)

## Установка

```bash
$ npm install
```

## Запуск

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Правила ветвления

Что-бы начать новую ветку фичи

```bash
# Начать разработку фичи
$ git flow feature start <feature_name>
# Закончить разработку фичи
$ git flow feature finish
```

Что-бы начать новую ветку фикса

```bash
# Начать ветку багфикса
$ git flow bugfix start <fix_name>
# Закрыть ветку багфикса
$ git flow bugfix finish
```

## Деплой и сборка

```bash
# Сборка для продакшена
$ docker-compose -f docker-compose.prod.yml build web

# Пуш в dockerhub
$ docker-compose -f docker-compose.prod.yml push web
```