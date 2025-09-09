# VTB PostgreSQL Query Optimizer

🚀 Приложение для оптимизации PostgreSQL запросов с интеллектуальными рекомендациями

## Особенности

- 🔍 Анализ и оптимизация SQL-запросов
- 🤖 AI-рекомендации по улучшению производительности
- 📊 Визуализация планов выполнения запросов
- 🔗 Поддержка множественных подключений к БД
- 💡 Интуитивный интерфейс с чат-ботом

## Быстрый старт

### Предварительные требования

- Node.js 18+
- PostgreSQL 12+
- Docker (опционально)

### Установка

```bash
# Клонирование репозитория
git clone <repository-url>
cd vtb-frontend

# Установка зависимостей
npm install

# Запуск в development режиме
npm run dev

# Или сборка для production
npm run build
npm start
```

### Docker запуск

```bash
# Сборка и запуск контейнера
docker build -t vtb-optimizer .
docker run -p 3000:3000 vtb-optimizer

# Или с помощью docker-compose
docker-compose up
```

## Использование

1. **Подключение к БД**: Введите строку подключения PostgreSQL
2. **Анализ запросов**: Введите SQL-запрос в чат
3. **Получение рекомендаций**: Система предложит оптимизации
4. **Визуализация**: Просмотр планов выполнения и статистики

## Технологии

- **Frontend**: React + TypeScript + Chakra UI

## Переменные окружения

Создайте файл `.env`:

```env
VITE_API_URL="api"
```

```bash

# Development режим с hot-reload
npm run dev

**VTB Hackathon 2025** • Команда [hsexmirea]