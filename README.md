# VoltMart: Electronics Online Store

A small online electronics store built for a take-home project: a **Nuxt 3** frontend, a **Django REST** API and a **PostgreSQL** database.

- **Live store:** https://electro-online-shop.vercel.app
- **Live API:** https://electro-online-shop.onrender.com/api/products/
- **Repository:** https://github.com/waruivince/electro-online-shop

> **Heads-up:** the API runs on a free host that goes to sleep when idle. The first request after a quiet period can take up to a minute. If the store looks empty or slow at first, open the API link above once, wait for it to answer, then reload the store.

## What it does

- **Product listing:** a responsive grid (2, 3 or 4 columns) with every product, loaded from the API.
- **Categories:** filter products by category. Each category has its own URL (`/category/phones`).
- **Product detail page:** a real page at `/products/<slug>` with image, brand, rating, description, specifications, price in KES and a stock label.
- **Cart:** a slide-out drawer with quantity controls (limited to available stock), removal, subtotal and a mocked checkout. The cart is saved in the browser, so it survives a page refresh.
- **SEO:** see the checklist below.
- **API search and filters:** `?search=`, `?category=` and `?featured=true` (see the API section).

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Nuxt 3 (server-side rendering), Vue 3, Tailwind CSS |
| Backend | Django 6, Django REST Framework, django-cors-headers, WhiteNoise, gunicorn |
| Database | PostgreSQL |
| Hosting | Vercel (frontend), Render (API and database) |

## SEO checklist

| Requirement | How it is done |
|---|---|
| Unique title and meta per page | `usePageSeo` composable sets the title and description for every page. Titles are formatted as "Page name \| VoltMart". |
| Open Graph tags | Title, description, URL, site name and image on every page (the product image on product pages). |
| Sitemap | Generated at `/sitemap.xml` from the live API, so new products appear automatically. |
| Structured data | `Product` schema (JSON-LD) on every product page, with brand, price in KES, availability and rating. |
| Clean URLs | Slug-based: `/products/aurora-pro-wireless-headphones`, `/category/headphones`. |
| Canonical links and robots | A canonical link on every page, and `robots.txt` pointing to the sitemap. |
| Server-side rendering | Pages are rendered on the server, so crawlers receive complete HTML with the products already in it. |
| Image handling | Lazy loading on product lists and explicit width and height on images to avoid layout shift. |
| Real 404s | Unknown products and categories return a genuine 404 status. |

## Project structure

```
electro-online-shop/
├── backend/            Django project (config/) and the products app
│   ├── products/       models, serializers, views, urls, tests, seed fixture
│   └── manage.py
├── frontend/           Nuxt 3 app
│   ├── pages/          index, category/[slug], products/[slug]
│   ├── components/     ProductCard, CategoryNav, CartDrawer
│   ├── composables/    useCart, usePageSeo
│   ├── server/routes/  sitemap.xml
│   └── utils/          formatPrice
└── documentation/      user stories and design screenshots
```

## Run it locally

### Requirements

Python 3.12, Node.js 20 or newer, and PostgreSQL.

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a PostgreSQL database and a user for it, then copy `.env.example` to `.env` and fill in the values:

| Variable | Meaning |
|---|---|
| `SECRET_KEY` | Django secret key (generate your own) |
| `DEBUG` | `true` for local development |
| `DB_NAME`, `DB_USER`, `DB_PASSWORD` | your database credentials |
| `DB_HOST`, `DB_PORT` | usually `localhost` and `5432` |

Then:

```bash
python manage.py migrate
python manage.py loaddata products/fixtures/seed.json   # 8 categories, 16 products
python manage.py runserver
```

The API is now at `http://127.0.0.1:8000/api/`. To run the tests, your database user needs permission to create databases:

```bash
python manage.py test
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The store is at `http://localhost:3000`. By default it uses the **live API**, so the frontend works without running the backend. To use your local API instead, set these variables (for example in `frontend/.env`):

```
NUXT_PUBLIC_API_BASE=http://127.0.0.1:8000/api
NUXT_PUBLIC_SITE_URL=http://localhost:3000
```

## API

All endpoints are read-only.

| Endpoint | Returns |
|---|---|
| `GET /api/categories/` | all categories |
| `GET /api/products/` | all products |
| `GET /api/products/?category=cameras` | products in one category |
| `GET /api/products/?featured=true` | featured products |
| `GET /api/products/?search=aurora` | products matching name, brand or category |
| `GET /api/products/<slug>/` | one product, or `404` |

Prices and ratings are returned as strings (for example `"44900.00"`) so decimal values are never rounded as floats. The frontend converts them for display.

## Key decisions

- **Server-side rendering (Nuxt).** The brief puts SEO first, and search engines index complete HTML most reliably. The pages fetch data on the server, so the HTML already contains the products, titles and structured data.
- **Separate API (Django REST) and PostgreSQL.** The backend is a clean JSON API that the frontend consumes. PostgreSQL stores relational data (categories and products) and flexible specifications.
- **Specs as a JSON field.** Specifications differ by product type (a camera has a sensor, a phone has storage). A JSON column keeps one table and renders whatever keys a product has.
- **Money as `Decimal`.** Floats round badly, so prices are decimals in the database and strings in the API.
- **Slugs for URLs.** They are readable, good for SEO, and do not change the way numeric ids can.
- **Cart in `localStorage`.** The brief allows a mocked checkout and has no user accounts, so a browser-side cart is the simplest correct choice. The shared cart state lives in one composable (`useCart`), and quantities are capped by stock.
- **Environment variables for configuration.** Secrets and addresses are never committed. `.env` is git-ignored and `.env.example` documents the variables.
- **Small, reviewed changes.** Work was done on feature branches and merged through pull requests, one step at a time. That keeps `main` working and shows the history.
- **Seed fixture loaded during the deploy build.** The free host has no shell access, so the build command loads `seed.json`. It is safe to repeat because the fixture uses fixed ids.

## Testing

The backend has 8 unit tests (Django REST test client) covering the category list, product list, category and featured filters, search (match and no match), the product detail with its nested category, and the 404 for an unknown slug. Run them with `python manage.py test`.

## Deployment

- **API:** Render web service (root directory `backend`). The build installs the packages, collects static files, runs migrations and loads the seed data. It starts with `gunicorn config.wsgi`. Configuration comes from environment variables (`SECRET_KEY`, `DEBUG`, `DATABASE_URL`, `ALLOWED_HOSTS`, `CSRF_TRUSTED_ORIGINS`, `CORS_ALLOWED_ORIGINS`).
- **Frontend:** Vercel (root directory `frontend`). It needs `NUXT_PUBLIC_API_BASE` and `NUXT_PUBLIC_SITE_URL`.

## Known limitations and what I would improve with more time

- **Search bar.** Search and filtering work in the API, but there is no search box in the interface yet. Adding it (and a search results page) is the next step.
- **Frontend tests.** The cart logic (quantity limits, totals, persistence) should have unit tests. Only the API has tests so far.
- **Removal confirmation.** Removing a cart item happens immediately with no confirmation. I cut it for time.
- **Dark mode, hero section and footer** from the original design mockup are not built.
- **Image optimization.** Product images are placeholders, so there is no responsive image pipeline yet. With real photos I would add `@nuxt/image` for resizing and modern formats.
- **Pagination** for large catalogs, and caching of the API responses.
- **A real checkout** with orders saved in the database and M-Pesa payment.
- **Free-tier limits.** The Render service sleeps when idle, and the free database has a limited lifetime. The seed fixture rebuilds the data if it is recreated.
- **Search results and error pages** deserve friendlier designs.

## Data and credits

- All products, brands, prices, ratings and review counts are **sample data** that I invented. The ratings are not real reviews.
- Product images are **placeholders** generated by placehold.co. "VoltMart" is an invented brand; no real store's branding or assets were used.
- The visual design was first sketched as a mockup with an AI design tool (Bolt), then rebuilt by hand in Nuxt and Tailwind.
- I used AI assistance throughout (Claude for guidance, code review and some of the code). I went through every part of the project and can explain it.
