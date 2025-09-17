# Система русско-китайского словаря

Система на основе локальных JSON-данных: файловый API на Express и современный фронтенд на Vite + React + TypeScript.

Смена языка: [简体中文](./README.md) | [English](./README.en.md) | Русский

## Архитектура
```
cidian_russiam/
├── tools/export/           # Необязательные скрипты подготовки данных (без облака)
├── server/src/            # Бэкенд Express (файловый API)
├── web/                   # Фронтенд Vite + React
├── exports/               # JSON-файлы с данными
└── README.md             # Документация
```

## Быстрый старт

### 1. Требования
```bash
node --version
npm install
```

### 2. Данные
Поместите `DictionaryCache.part*.json` и `DictionaryCache.index.json` в `exports/`.

### 3. Запуск бэкенда
```bash
npm run dev:server
# либо
nohup npx ts-node --esm server/src/index.ts > server.dev.log 2>&1 &
```
Бэкенд: `http://localhost:3000`, документация Swagger: `/docs`.

### 4. Запуск фронтенда
```bash
cd web
npm install
npm run dev
```
Откройте адрес, показанный Vite (обычно `http://localhost:5173`).

## Данные и функциональность
- 21 636 записей
- Источник: локальные JSON-файлы
- Поля: произношение, грамматика, примеры, культурные заметки и т.д.

## API

### Поиск
```http
GET /api/search?q=ключевое_слово&limit=20&offset=0
```

### Карточка
```http
GET /api/by-id/:objectId
```

### Статистика
```http
GET /api/stats
```

### Healthcheck
```http
GET /health
```

Подробнее: `ваш-домен/docs`

## Развертывание

### Бэкенд
1) `npm run build`
2) Загрузите `dist/` на сервер
3) `npm install --production`
4) `npm run start:server`

### Фронтенд
1) `cd web`
2) `npm run build`
3) Загрузите `dist/` на статический сервер
4) Настройте прокси к бэкенду

### Переменные окружения
```bash
# бэкенд
PORT=3000

# фронтенд
VITE_API_BASE_URL=ваш-домен/api
VITE_DOCS_URL=ваш-домен/docs
```

## Руководство по разработке
- Бэкенд: Node.js + Express + TypeScript
- Фронтенд: Vite + React + TypeScript + Tailwind CSS
- Данные: локальные JSON (без облачных зависимостей)
- Архитектура: MVVM

## Структура исходников
```
├── tools/export/              # подготовка данных (опционально)
├── server/src/index.ts        # бэкенд
├── web/src/                   # фронтенд
│   ├── services/api.ts        # сервисы API
│   ├── viewmodels/            # viewmodel
│   ├── pages/                 # страницы
│   └── App.tsx                # приложение
└── exports/                   # данные
```

## Команды
```bash
npm run dev:server
cd web && npm run dev
npm run build
cd web && npm run build
```

## Возможности
- Поиск по ключевым словам (рус/кит)
- Карточка слова: грамматика, род, словоизменение, произношение, родственные слова, примеры, культурные заметки, этимология, анализ предложений, метаданные
- Адаптивный современный интерфейс
- Удобная работа с клавиатуры (Enter для поиска)

## Безопасность
- Используйте переменные окружения в продакшене

## История изменений

### v1.0.0
- Фронтенд на React + TS
- Страница деталей слова
- Адаптивный дизайн
- Архитектура MVVM
- Swagger API

## Лицензия (Non-Commercial Use License)
- Для личного некоммерческого использования: бесплатно, без разрешения.
- Для коммерческого использования: требуется предварительное письменное разрешение автора.
- Полный текст — в файле `LICENSE`.

## Автор и компания
- Продукт и автор: приложение для изучения русского языка «鹅语菌» — [https://russian.egg404.com/](https://russian.egg404.com/)
- Компания: «泸州山禾网络科技有限责任公司» — [https://egg404.com/](https://egg404.com/)
