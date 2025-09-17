# Система русско-китайского словаря

Система словаря на основе локальных JSON-данных: файловый API на Express и современный фронтенд на Vite + React + TypeScript.

## Структура проекта
```
cidian_russiam/
├── server/src/            # Бэкенд Express (файловый API)
├── web/                   # Фронтенд Vite + React
├── exports/               # JSON-файлы с данными (разместите здесь)
└── README.md              # Документация (китайский)
```

## Быстрый старт
- Требования: Node.js 18+
- Установка зависимостей:
```bash
npm install
```
- Подготовка данных: поместите `DictionaryCache.part*.json` и `DictionaryCache.index.json` в каталог `exports/`.

### Запуск бэкенда
```bash
npm run dev:server
```
Бэкенд по адресу `http://localhost:3000`, документация Swagger — `/docs`.

### Запуск фронтенда
```bash
cd web
npm install
npm run dev
```
Откройте адрес, который выведет Vite (например, `http://localhost:5173`).

## Возможности
- Поиск слов на русском и китайском
- Подробная карточка слова (грамматика, произношение, примеры, родственные слова и т.д.)
- Современный адаптивный интерфейс (Tailwind CSS v4)
- Архитектура MVVM (services + viewmodels + views)

## Переменные окружения
```bash
# бэкенд
PORT=3000
# фронтенд
VITE_API_BASE_URL=ваш-домен/api
VITE_DOCS_URL=ваш-домен/docs
```

## Лицензия
MIT License
