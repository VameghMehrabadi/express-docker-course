# Express + PostgreSQL + Docker Course Project

یک پروژه آموزشی برای تدریس Docker با Node.js/Express و PostgreSQL.

## پیش‌نیاز

- Node.js 20+
- Docker
- Docker Compose

## اجرای محلی بدون Docker

```bash
npm install
cp .env.example .env
npm run dev
```

در این حالت PostgreSQL باید روی سیستم شما اجرا باشد.

## اجرای کامل با Docker Compose

```bash
docker compose up --build
```

API:

- GET http://localhost:3000/health
- GET http://localhost:3000/api/users

## توقف

```bash
docker compose down
```

برای حذف volume دیتابیس:

```bash
docker compose down -v
```

> دستور `down -v` اطلاعات PostgreSQL را حذف می‌کند.

## API

### List

```http
GET /api/users
```

### Get one

```http
GET /api/users/1
```

### Create

```http
POST /api/users
Content-Type: application/json

{
  "name": "Reza",
  "email": "reza@example.com"
}
```

### Update

```http
PUT /api/users/1
Content-Type: application/json

{
  "name": "Ali Updated",
  "email": "ali.updated@example.com"
}
```

### Delete

```http
DELETE /api/users/1
```

## مفاهیم Docker که می‌توان با این پروژه تدریس کرد

### Level 1 - Containers

```bash
docker build -t express-course .
docker run --rm -p 3000:3000 express-course
```

### Level 2 - Container inspection

```bash
docker ps
docker logs express_api
docker exec -it express_api sh
```

### Level 3 - Compose

```bash
docker compose up --build
docker compose ps
docker compose logs -f api
docker compose logs -f db
```

### Level 4 - Volume

```bash
docker volume ls
docker volume inspect express-docker-course_postgres_data
```

داده PostgreSQL در `postgres_data` نگهداری می‌شود.

### Level 5 - Network

Compose یک network به نام `app_network` می‌سازد.

نکته آموزشی مهم:

داخل container، Express برای اتصال به PostgreSQL نباید از `localhost` استفاده کند؛ باید از نام سرویس استفاده کند:

```text
DB_HOST=db
```

چون `db` نام سرویس PostgreSQL در Compose است.

### Level 6 - Healthcheck

PostgreSQL قبل از آماده شدن کامل، ممکن است هنوز connection قبول نکند.

Healthcheck:

```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U postgres -d docker_course"]
```

و API با:

```yaml
depends_on:
  db:
    condition: service_healthy
```

بعد از سالم شدن دیتابیس اجرا می‌شود.

## Production

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

Dockerfile production:

- فقط dependencyهای production نصب می‌شوند.
- برنامه با user غیر root اجرا می‌شود.
- source code بعد از نصب dependencyها کپی می‌شود.

## تمرین‌های پیشنهادی کلاس

1. مقدار PORT را تغییر دهید.
2. PostgreSQL را از host خارج کنید و فقط داخل Compose اجرا کنید.
3. API را به یک network جدید منتقل کنید.
4. volume دیتابیس را حذف کنید و اثر آن را بررسی کنید.
5. container دیتابیس را حذف کنید و ببینید داده‌ها باقی می‌مانند یا نه.
6. `DB_HOST=db` را به `DB_HOST=localhost` تغییر دهید و خطا را تحلیل کنید.
7. یک endpoint برای search کاربران اضافه کنید.
8. pagination اضافه کنید.
9. Dockerfile را multi-stage کنید.
10. image را با `docker image ls` و `docker history` بررسی کنید.
11. محدودیت CPU/Memory برای سرویس‌ها اضافه کنید.
12. secrets و environment variables را برای production بازطراحی کنید.
