module.exports = {
  apps: [
    {
      name: 'Backend',
      script: 'dist/main.js',
      watch: false,
      post_deploy: [
        'npm install', // Установка зависимостей
        'npm run build', // Сборка проекта
        'pm2 restart nestjs-app', // Перезапуск приложения после сборки
      ],
    },
  ],
};
