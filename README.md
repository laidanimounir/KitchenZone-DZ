# HiyoRi Ecommerce — Next.js + Supabase + GraphQL

> مشروع تجارة إلكترونية متكامل مبني بأحدث التقنيات

![License](https://img.shields.io/badge/license-MIT-green) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green) ![GraphQL](https://img.shields.io/badge/GraphQL-pg__graphql-pink)

---

## 📌 نبذة عن المشروع

هذا المشروع **مفتوح المصدر** تم بناؤه في الأصل من طرف **Hugo Lam** وهو متاح للجميع للاستخدام والتعلم والتطوير تحت رخصة **MIT**.

- 🔗 **المشروع الأصلي:** [github.com/clonglam/HiyoRi-Ecommerce-Nextjs-Supabase](https://github.com/clonglam/HiyoRi-Ecommerce-Nextjs-Supabase)
- 👨‍💻 **المطور الأصلي:** Hugo Lam
- 🛠️ **إعداد وتشغيل محلي بواسطة:** Mounir Laidani
- 📅 **تاريخ الإعداد:** مايو 2026

> شكراً لـ Hugo Lam على هذا المشروع الرائع المفتوح المصدر 🙏

---

## 🚀 التقنيات المستخدمة

- **Next.js 14** — إطار عمل React مع Server Side Rendering
- **Supabase** — قاعدة البيانات والمصادقة
- **GraphQL (pg_graphql)** — جلب البيانات بكفاءة
- **Drizzle ORM** — إدارة Schema قاعدة البيانات
- **urql** — GraphQL Client
- **ShadcnUI + TailwindCSS** — واجهة المستخدم
- **Stripe** — بوابة الدفع (معدة للتكامل لاحقاً)
- **AWS S3** — رفع الصور (معدة للتكامل لاحقاً)

---

## ✅ ما تم إنجازه

### 1. إعداد البيئة المحلية
- استنساخ المشروع في `Desktop/Hiyori/HiyoRi-Ecommerce-Nextjs-Supabase`
- تثبيت الحزم بنجاح عبر `npm install`
- إنشاء ملف `.env.local` بجميع المتغيرات المطلوبة

### 2. إعداد Supabase
- إنشاء مشروع Supabase جديد باسم **HiyoRi-mounir**
- الحصول على جميع المفاتيح: `ANON_KEY`, `SERVICE_ROLE_KEY`, `DATABASE_URL`
- رفع الـ Schema كاملاً عبر `npx drizzle-kit push:pg`
- تفعيل extension الـ `pg_graphql` يدوياً من SQL Editor

### 3. حل مشكلة الاتصال بقاعدة البيانات
- اكتشاف أن الشبكة الجزائرية تعمل بـ **IPv4 فقط**
- التحويل من **Direct Connection** إلى **Session Pooler**
- تغيير الـ `DATABASE_URL` ليستخدم:
  `aws-1-eu-central-1.pooler.supabase.com` بدل `db.xxxx.supabase.co`

### 4. حل مشاهيم المتغيرات البيئية
- اكتشاف أن `drizzle-kit` يقرأ `.env` فقط وليس `.env.local`
- إصلاح `drizzle.config.ts` بإضافة `{ path: ".env.local" }`
- إضافة المتغيرات الناقصة:
  - `DATABASE_SERVICE_ROLE`
  - `NEXT_PUBLIC_SUPABASE_PROJECT_REF`
  - `NEXT_PUBLIC_SITE_URL`
  - `STRIPE_WEBHOOK_SECERT_KEY`
  - `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`
  - `NEXT_PUBLIC_S3_BUCKET`, `NEXT_PUBLIC_S3_REGION`

### 5. حل مشكلة GraphQL
- اكتشاف أن الـ header كان `apiKey` بدل `apikey` (حرف K كبير)
- إضافة `Authorization: Bearer` header للـ server-side client
- إضافة صلاحيات لـ schema الـ GraphQL:
  ```sql
  grant usage on schema graphql to anon;
  grant usage on schema graphql to authenticated;
  ```
- إضافة `export const dynamic = 'force-dynamic'` لصفحة الـ shop
- إصلاح خطأ `data === null` إلى `!data` في الصفحة الرئيسية

### 6. تشغيل المشروع
- المشروع يعمل على `http://localhost:3000`
- إضافة بيانات تجريبية (collection + product) عبر SQL
- التحقق من ظهور المنتجات في الموقع ✅

---

## 🔧 طريقة التشغيل المحلي

### المتطلبات
- Node.js v18+
- حساب Supabase
- PowerShell أو Terminal

### خطوات الإعداد

**1. استنسخ المشروع:**
```powershell
git clone https://github.com/clonglam/HiyoRi-Ecommerce-Nextjs-Supabase.git
cd HiyoRi-Ecommerce-Nextjs-Supabase
npm install
```

**2. انتقل لمجلد المشروع (إذا استنسخته مسبقاً):**
```powershell
cd $HOME\Desktop\Hiyori\HiyoRi-Ecommerce-Nextjs-Supabase
```

**3. تأكد من محتوى `.env.local`:**
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
DATABASE_SERVICE_ROLE=eyJ...
DATABASE_URL=postgresql://postgres.xxxx:PASSWORD@aws-1-eu-central-1.pooler.supabase.com:5432/postgres
NEXT_PUBLIC_SUPABASE_PROJECT_REF=xxxx

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret

# Stripe (placeholder للتطوير المحلي)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
STRIPE_SECRET_KEY=sk_test_placeholder
STRIPE_WEBHOOK_SECERT_KEY=whsec_placeholder

# S3 (placeholder للتطوير المحلي)
S3_ACCESS_KEY_ID=placeholder
S3_SECRET_ACCESS_KEY=placeholder
NEXT_PUBLIC_S3_BUCKET=placeholder
NEXT_PUBLIC_S3_REGION=eu-central-1

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**4. رفع Schema قاعدة البيانات:**
```powershell
npx drizzle-kit push:pg
```

**5. تشغيل المشروع:**
```powershell
npm run dev
```

**6. افتح المتصفح:**
```
http://localhost:3000
```

---

## ⚠️ الصعوبات التي واجهناها

### 1. مشكلة النسخ من المحادثة
عند نسخ الـ `DATABASE_URL` من المحادثة، كانت المحادثة تحول الرموز `@` و `.` إلى روابط HTML تلقائياً، مما يجعل الـ URL خاطئاً عند لصقه.
**الحل:** كتابة الـ URL يدوياً في VS Code حرفاً بحرف.

### 2. مشكلة IPv4
شبكة الإنترنت الجزائرية تعمل بـ IPv4 فقط، والـ Direct Connection في Supabase يتطلب IPv6.
**الحل:** استخدام **Session Pooler** بدل Direct Connection.

### 3. drizzle-kit لا يقرأ `.env.local`
`drizzle-kit` يقرأ ملف `.env` فقط بشكل افتراضي.
**الحل:** تعديل `drizzle.config.ts`:
```typescript
dotenv.config({ path: ".env.local" });
```

### 4. pg_graphql لا يعمل رغم تفعيله
رغم تفعيل extension من لوحة التحكم، كان الخطأ يستمر بسبب:
- الـ `apikey` header كان مكتوباً بحرف K كبير `apiKey`
- الـ server-side client لم يكن يرسل الـ Authorization header
- صلاحيات schema الـ GraphQL لم تكن ممنوحة لـ `anon`

### 5. المتغيرات البيئية الناقصة
المشروع يحتاج متغيرات إضافية غير موثقة في الـ README الأصلي مثل `DATABASE_SERVICE_ROLE` و `NEXT_PUBLIC_SUPABASE_PROJECT_REF`.

---

## 🔜 ما تبقى للإعداد الكامل

| الميزة | الحالة | المطلوب |
|--------|--------|---------|
| قاعدة البيانات | ✅ تعمل | — |
| GraphQL | ✅ يعمل | — |
| المصادقة (Auth) | ⚠️ جزئي | إعداد Google OAuth في Supabase |
| الدفع (Stripe) | ❌ placeholder | حساب Stripe حقيقي + Webhook |
| رفع الصور (S3) | ❌ placeholder | حساب AWS + S3 Bucket |
| لوحة الإدارة (CMS) | ⚠️ غير مختبرة | إضافة بيانات حقيقية |
| Row Level Security | ❌ معطل | تفعيل RLS وإضافة policies |

---

## 📄 صفحات المشروع

### 🛍️ المتجر (Store)
| الصفحة | الرابط |
|--------|--------|
| الرئيسية | `/` |
| المتجر | `/shop` |
| منتج محدد | `/shop/[slug]` |
| تصنيف محدد | `/collections/[slug]` |
| السلة | `/cart` |
| قائمة الأمنيات | `/wish-list` |
| الطلبات | `/orders` |
| تفاصيل طلب | `/orders/[orderId]` |
| الإعدادات | `/setting` |
| إعدادات الحساب | `/setting/account` |
| العناوين | `/setting/address` |
| النشرة البريدية | `/setting/newsletter` |

### 🔐 المصادقة (Auth)
| الصفحة | الرابط |
|--------|--------|
| تسجيل الدخول | `/sign-in` |
| إنشاء حساب | `/sign-up` |
| صفحة الخطأ | `/error` |

### ⚙️ لوحة الإدارة (Admin CMS)
| الصفحة | الرابط |
|--------|--------|
| الرئيسية | `/admin` |
| Dashboard | `/admin/dashboard` |
| المنتجات | `/admin/products` |
| إضافة منتج | `/admin/products/new` |
| تعديل منتج | `/admin/products/[productId]` |
| التصنيفات | `/admin/collections` |
| إضافة تصنيف | `/admin/collections/new` |
| تعديل تصنيف | `/admin/collections/[collectionId]` |
| الطلبات | `/admin/orders` |
| المستخدمون | `/admin/users` |
| إضافة مستخدم | `/admin/users/new` |
| تفاصيل مستخدم | `/admin/users/[userId]` |
| ملفات المستخدمين | `/admin/users/profiles` |
| الصور | `/admin/medias` |
| رفع صورة | `/admin/medias/new` |
| تفاصيل صورة | `/admin/medias/[mediaId]` |

---

## 📁 هيكل المشروع

```
src/
├── app/
│   ├── (store)/          # صفحات المتجر العامة
│   └── (dashboard)/      # لوحة الإدارة CMS
├── features/
│   ├── products/         # المنتجات
│   ├── collections/      # التصنيفات
│   ├── carts/            # السلة
│   ├── search/           # البحث
│   └── users/            # المستخدمون
├── lib/
│   ├── supabase/         # Schema + إعدادات Supabase
│   └── urql.ts           # GraphQL Client
├── providers/            # React Providers
└── env.mjs               # التحقق من المتغيرات البيئية
```

---

## 👨‍💻 ملاحظات للمطور

- استخدم **VS Code** لتعديل الملفات وتجنب النسخ من المحادثات للروابط
- عند تغيير `.env.local` أعد تشغيل السيرفر دائماً
- قاعدة البيانات على **Frankfurt (eu-central-1)** وهو الأقرب للجزائر
- الـ Session Pooler يعمل على port `5432` وليس `6543`

---

## 📄 الرخصة

هذا المشروع مرخص تحت رخصة **MIT** — يمكنك استخدامه، تعديله، ونشره بحرية كاملة مع الإشارة للمصدر الأصلي.

---

## 🙏 شكر وتقدير

- **Hugo Lam** — المطور الأصلي للمشروع
- **Supabase** — قاعدة البيانات المجانية والرائعة
- **Vercel** — فريق Next.js
- **urql** — GraphQL client خفيف وقوي