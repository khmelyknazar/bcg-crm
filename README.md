# BCG CRM

CRM для малого бізнесу (курсова робота): клієнти, угоди (канбан), завдання, послуги, аналітика.

## Стек

- Бекенд: NestJS 12, Prisma 7, SQLite, JWT
- Фронтенд: React 19, Vite, Tailwind CSS
- Менеджер пакетів: pnpm (workspace)

## Запуск

1. Встановити залежності (з кореня):

    pnpm install

2. Налаштувати бекенд: скопіювати backend/.env.example у backend/.env і вписати власний JWT_SECRET.

3. Створити базу (з папки backend):

    pnpm exec prisma migrate dev
    pnpm exec prisma generate

4. Фронтенд: створити frontend/.env.local з рядком

    VITE_API_URL=http://localhost:3001

5. Запустити обидва сервіси (з кореня):

    pnpm dev

Фронтенд: http://localhost:5173. Бекенд: http://localhost:3001. Документація API (Swagger): http://localhost:3001/api.

## Демо-акаунти

- owner@bcg.ua / owner123 (роль OWNER)
- manager@bcg.ua / manager123 (роль MANAGER)

Перший запуск автоматично заповнює базу тестовими даними.

## Автентифікація

За замовчуванням захист API вимкнений (AUTH_ENABLED=false в backend/.env). Для увімкнення поставте true і перезапустіть бекенд: усі ендпоінти, окрім /auth/register та /auth/login, вимагатимуть заголовок Authorization: Bearer <token>.