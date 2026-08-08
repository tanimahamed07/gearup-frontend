# GearUp Frontend - API Integration Documentation

## Overview

This document provides a comprehensive mapping of all Next.js frontend routes, UI components, and their corresponding backend REST API endpoints for the GearUp Sports Equipment Rental Platform (Assignment 5).

**Project**: GearUp Frontend  
**Framework**: Next.js 15 (App Router)  
**Backend API Base URL**: `${BACKEND_API_URL}` (configured in `.env`)  
**Authentication**: JWT-based (Access Token + Refresh Token)

---

## Table of Contents

1. [Authentication & Authorization](#1-authentication--authorization)
2. [Public Routes & Gear Browsing](#2-public-routes--gear-browsing)
3. [Customer Dashboard](#3-customer-dashboard)
4. [Provider Dashboard](#4-provider-dashboard)
5. [Admin Dashboard](#5-admin-dashboard)
6. [Reviews & Ratings](#6-reviews--ratings)
7. [Payment Integration](#7-payment-integration)
8. [Utility & Support Endpoints](#8-utility--support-endpoints)

---

## 1. Authentication & Authorization

### Login & Registration

| Frontend Route | Component/Action                                      | Backend API Endpoint | Method | Request Body                      | Response                        | Auth Required |
| -------------- | ----------------------------------------------------- | -------------------- | ------ | --------------------------------- | ------------------------------- | ------------- |
| `/login`       | `app/(auth)/login/page.tsx`<br/>`loginForm.tsx`       | `/api/auth/login`    | POST   | `{ email, password }`             | `{ accessToken, refreshToken }` | No            |
| `/register`    | `app/(auth)/register/page.tsx`<br/>`registerForm.tsx` | `/api/auth/register` | POST   | `{ name, email, password, role }` | `{ accessToken, refreshToken }` | No            |

**Implementation Files:**

- Action: `app/(auth)/_action/authAction.ts`
- Components: `app/(auth)/_components/loginForm.tsx`, `registerForm.tsx`
- Validation: `lib/validations/auth.schema.ts`

### User Session Management

| Purpose          | Backend API Endpoint      | Method | Frontend Implementation              | Auth Required |
| ---------------- | ------------------------- | ------ | ------------------------------------ | ------------- |
| Get Current User | `/api/auth/me`            | GET    | `service/getMe.ts`                   | Yes (Cookie)  |
| Refresh Token    | `/api/auth/refresh-token` | POST   | `service/refreshToken.ts`            | Yes (Cookie)  |
| Logout           | N/A (Client-side)         | N/A    | `service/logout.ts` (Clears cookies) | Yes           |

**Middleware Protection:**

- File: `proxy.ts` (Next.js Middleware)
- Handles: Token validation, refresh, role-based redirects, suspended user checks

---

## 2. Public Routes & Gear Browsing

### Gear Listing & Search

| Frontend Route | Component                          | Backend API Endpoint | Method | Query Parameters                                             | Auth Required |
| -------------- | ---------------------------------- | -------------------- | ------ | ------------------------------------------------------------ | ------------- |
| `/` (Home)     | `app/(public)/page.tsx`            | `/api/gear`          | GET    | `?categoryId, availability, priceMin, priceMax, page, limit` | No            |
| `/gears`       | `app/(public)/gears/page.tsx`      | `/api/gear`          | GET    | `?categoryId, availability, priceMin, priceMax, page, limit` | No            |
| `/gears/[id]`  | `app/(public)/gears/[id]/page.tsx` | `/api/gear/:id`      | GET    | -                                                            | No            |

**Implementation Files:**

- Actions: `app/(public)/_action/getAllGear.ts`, `getGearById.ts`
- Components: `GearList.tsx`, `GearCard.tsx`, `BookingModal.tsx`
- Filters: `SidebarFilter.tsx`, `CategoryFilter.tsx`, `PriceFilter.tsx`, `AvailabilityFilter.tsx`

### Categories

| Purpose            | Backend API Endpoint | Method | Frontend Implementation               | Auth Required |
| ------------------ | -------------------- | ------ | ------------------------------------- | ------------- |
| Get All Categories | `/api/category`      | GET    | `app/(public)/_action/getCategory.ts` | No            |

**Used In:**

- Homepage category filters
- Gear browsing filters
- Provider gear creation form

---

## 3. Customer Dashboard

### Dashboard Overview

| Frontend Route        | Component                                     | Backend API Endpoint | Method | Purpose                 | Auth Required  |
| --------------------- | --------------------------------------------- | -------------------- | ------ | ----------------------- | -------------- |
| `/customer-dashboard` | `app/(dashboard)/customer-dashboard/page.tsx` | `/api/dashboard`     | GET    | Customer overview stats | Yes (CUSTOMER) |

**Implementation:**

- Action: `app/(dashboard)/_action/dashboardOverview.ts`
- Layout: `app/(dashboard)/layout.tsx`
- Components: `Sidebar.tsx`, `DashboardHeader.tsx`

### Rental Orders (Customer)

| Frontend Route                    | Component              | Backend API Endpoint | Method | Purpose                  | Auth Required  |
| --------------------------------- | ---------------------- | -------------------- | ------ | ------------------------ | -------------- |
| `/customer-dashboard/orders`      | `orders/page.tsx`      | `/api/rentals`       | GET    | Get all customer rentals | Yes (CUSTOMER) |
| `/customer-dashboard/orders/[id]` | `orders/[id]/page.tsx` | `/api/rentals/:id`   | GET    | Get rental details       | Yes (CUSTOMER) |

**Implementation Files:**

- Service: `service/dashboard/customer/getMyOrder.ts`, `getRentalOrderDetails.ts`
- Components: `OrderRow.tsx`

### Create Rental (Booking)

| Purpose             | Backend API Endpoint | Method | Request Body                               | Frontend Implementation             | Auth Required |
| ------------------- | -------------------- | ------ | ------------------------------------------ | ----------------------------------- | ------------- |
| Create Rental Order | `/api/rentals`       | POST   | `{ gearId, startDate, endDate, quantity }` | `app/(public)/_action/bookOrder.ts` | Yes           |

**Used In:**

- `BookingModal.tsx` (Public gear detail page)

### Payment History

| Frontend Route                 | Component           | Backend API Endpoint | Method | Purpose             | Auth Required  |
| ------------------------------ | ------------------- | -------------------- | ------ | ------------------- | -------------- |
| `/customer-dashboard/payments` | `payments/page.tsx` | `/api/payments`      | GET    | Get payment history | Yes (CUSTOMER) |

**Implementation:**

- Service: `service/dashboard/customer/getPaymentHistory.ts`

---

## 4. Provider Dashboard

### Provider Overview

| Frontend Route        | Component                                     | Backend API Endpoint | Method | Purpose                 | Auth Required  |
| --------------------- | --------------------------------------------- | -------------------- | ------ | ----------------------- | -------------- |
| `/provider-dashboard` | `app/(dashboard)/provider-dashboard/page.tsx` | `/api/dashboard`     | GET    | Provider overview stats | Yes (PROVIDER) |

### Gear Inventory Management

| Frontend Route              | Component                           | Backend API Endpoint    | Method | Purpose                      | Auth Required  |
| --------------------------- | ----------------------------------- | ----------------------- | ------ | ---------------------------- | -------------- |
| `/provider-dashboard/gears` | `provider-dashboard/gears/page.tsx` | `/api/gear/my/listings` | GET    | Get provider's gear listings | Yes (PROVIDER) |

**Implementation:**

- Action: `app/(dashboard)/_action/providerGearList.ts`
- Components: `GearFormDialog.tsx`, `GearActionMenu.tsx`, `GearDeleteDialog.tsx`

### CRUD Operations (Gear)

| Purpose     | Backend API Endpoint | Method | Request Body                                                      | Frontend Implementation     | Auth Required  |
| ----------- | -------------------- | ------ | ----------------------------------------------------------------- | --------------------------- | -------------- |
| Create Gear | `/api/gear`          | POST   | `{ name, description, categoryId, pricePerDay, quantity, image }` | `_action/postGearItem.ts`   | Yes (PROVIDER) |
| Update Gear | `/api/gear/:id`      | PATCH  | `{ name, description, categoryId, pricePerDay, quantity, image }` | `_action/updateGearItem.ts` | Yes (PROVIDER) |
| Delete Gear | `/api/gear/:id`      | DELETE | -                                                                 | `_action/deleteGearItem.ts` | Yes (PROVIDER) |

**Components:**

- Form: `GearFormDialog.tsx`
- Validation: `lib/validations/gear.schema.ts`

### Incoming Orders (Provider)

| Frontend Route               | Component                            | Backend API Endpoint             | Method | Purpose                      | Auth Required  |
| ---------------------------- | ------------------------------------ | -------------------------------- | ------ | ---------------------------- | -------------- |
| `/provider-dashboard/orders` | `provider-dashboard/orders/page.tsx` | `/api/rentals/provider/incoming` | GET    | Get incoming rental requests | Yes (PROVIDER) |

**Implementation:**

- Action: `app/(dashboard)/_action/getIncomingOrders.ts`
- Components: `OrderRow.tsx`, `StatusSelect.tsx`

### Order Status Management

| Purpose             | Backend API Endpoint             | Method | Request Body | Frontend Implementation        | Auth Required  |
| ------------------- | -------------------------------- | ------ | ------------ | ------------------------------ | -------------- |
| Update Order Status | `/api/rentals/provider/:orderId` | PATCH  | `{ status }` | `_action/updateOrderStatus.ts` | Yes (PROVIDER) |

**Statuses:** `PENDING`, `APPROVED`, `REJECTED`, `COMPLETED`, `CANCELLED`

---

## 5. Admin Dashboard

### Admin Overview

| Frontend Route     | Component                                  | Backend API Endpoint | Method | Purpose              | Auth Required |
| ------------------ | ------------------------------------------ | -------------------- | ------ | -------------------- | ------------- |
| `/admin-dashboard` | `app/(dashboard)/admin-dashboard/page.tsx` | `/api/dashboard`     | GET    | Admin overview stats | Yes (ADMIN)   |

### User Management

| Frontend Route           | Component                        | Backend API Endpoint    | Method | Purpose       | Auth Required |
| ------------------------ | -------------------------------- | ----------------------- | ------ | ------------- | ------------- |
| `/admin-dashboard/users` | `admin-dashboard/users/page.tsx` | `/api/auth/admin/users` | GET    | Get all users | Yes (ADMIN)   |

**Implementation:**

- Action: `app/(dashboard)/_action/getAllUsers.ts`
- Components: `UserStatusSelect.tsx`

### User Status Management

| Purpose            | Backend API Endpoint            | Method | Request Body | Frontend Implementation       | Auth Required |
| ------------------ | ------------------------------- | ------ | ------------ | ----------------------------- | ------------- |
| Update User Status | `/api/auth/admin/users/:userId` | PATCH  | `{ status }` | `_action/updateUserStatus.ts` | Yes (ADMIN)   |

**Statuses:** `ACTIVE`, `SUSPENDED`

### Category Management

| Frontend Route                | Component                             | Backend API Endpoint | Method | Purpose            | Auth Required |
| ----------------------------- | ------------------------------------- | -------------------- | ------ | ------------------ | ------------- |
| `/admin-dashboard/categories` | `admin-dashboard/categories/page.tsx` | `/api/category`      | GET    | Get all categories | Yes (ADMIN)   |

**CRUD Operations:**

| Purpose         | Backend API Endpoint | Method | Request Body            | Frontend Implementation     | Auth Required |
| --------------- | -------------------- | ------ | ----------------------- | --------------------------- | ------------- |
| Create Category | `/api/category`      | POST   | `{ name, description }` | `_action/postCategory.ts`   | Yes (ADMIN)   |
| Delete Category | `/api/category/:id`  | DELETE | -                       | `_action/deleteCategory.ts` | Yes (ADMIN)   |

**Components:**

- `CategoryTable.tsx`, `CategoryCreateModal.tsx`, `CategoryDeleteDialog.tsx`
- `CategoryTableRow.tsx`

---

## 6. Reviews & Ratings

### Review Management

| Purpose          | Backend API Endpoint        | Method | Request Body                  | Frontend Implementation           | Auth Required |
| ---------------- | --------------------------- | ------ | ----------------------------- | --------------------------------- | ------------- |
| Get Gear Reviews | `/api/reviews/gear/:gearId` | GET    | -                             | `service/review/getGearReview.ts` | No            |
| Create Review    | `/api/reviews`              | POST   | `{ gearId, rating, comment }` | `service/review/createReview.ts`  | Yes           |
| Update Review    | `/api/reviews/:reviewId`    | PATCH  | `{ rating, comment }`         | `service/review/updateReview.ts`  | Yes           |
| Delete Review    | `/api/reviews/:reviewId`    | DELETE | -                             | `service/review/deleteReview.ts`  | Yes           |

**Components:**

- `components/review/CreateReviewModal.tsx`
- Used on gear detail pages and customer order history

---

## 7. Payment Integration

### Stripe Payment

| Purpose               | Backend API Endpoint   | Method | Request Body           | Frontend Implementation                           | Auth Required  |
| --------------------- | ---------------------- | ------ | ---------------------- | ------------------------------------------------- | -------------- |
| Create Payment Intent | `/api/payments/create` | POST   | `{ rentalId, amount }` | `service/dashboard/customer/payment.ts`           | Yes (CUSTOMER) |
| Get Payment History   | `/api/payments`        | GET    | -                      | `service/dashboard/customer/getPaymentHistory.ts` | Yes (CUSTOMER) |

**Payment Flow:**

1. Customer creates rental order
2. Order status is PENDING
3. Customer initiates payment
4. Backend creates Stripe Payment Intent
5. Frontend completes payment with Stripe.js
6. Backend updates order status to APPROVED/PAID

---

## 8. Utility & Support Endpoints

### Additional Routes

| Frontend Route        | Component                     | Purpose             |
| --------------------- | ----------------------------- | ------------------- |
| `/about`              | `app/(public)/about/page.tsx` | About page          |
| `/loading.tsx`        | Global loading state          | Loading UI          |
| Various `loading.tsx` | Route-specific loading states | Suspense boundaries |

### API Route Handlers (Internal)

| Route              | File                           | Purpose                                 |
| ------------------ | ------------------------------ | --------------------------------------- |
| `/api/auth/status` | `app/api/auth/status/route.ts` | Check user status (client-side polling) |

---

## Authentication Flow

### 1. **Login Process**

```
User submits credentials
  ↓
POST /api/auth/login
  ↓
Backend validates & returns tokens
  ↓
Frontend stores in httpOnly cookies
  ↓
Middleware validates & redirects to dashboard
```

### 2. **Protected Route Access**

```
User requests dashboard route
  ↓
Middleware (proxy.ts) checks accessToken
  ↓
If expired → Uses refreshToken to get new accessToken
  ↓
If valid → Checks user status (SUSPENDED check)
  ↓
If ACTIVE → Allows access
  ↓
If SUSPENDED → Redirects to login with suspended=true
```

### 3. **Role-Based Access**

```
Middleware validates role from JWT
  ↓
/customer-dashboard → Only CUSTOMER
/provider-dashboard → Only PROVIDER
/admin-dashboard → Only ADMIN
  ↓
Invalid role → Redirect to /not-found
```

---

## Request/Response Examples

### Authentication

#### Login Request

```json
POST /api/auth/login
{
  "email": "customer@gearup.com",
  "password": "password123"
}
```

#### Login Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Gear Listing

#### Get All Gear Request

```
GET /api/gear?categoryId=abc123&availability=true&priceMin=10&priceMax=50&page=1&limit=12
```

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "gear123",
      "name": "Mountain Bike",
      "description": "High-quality mountain bike",
      "pricePerDay": 25,
      "quantity": 5,
      "availability": true,
      "categoryId": "abc123",
      "category": {
        "id": "abc123",
        "name": "Bikes"
      },
      "providerId": "provider123",
      "images": ["url1", "url2"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 50
  }
}
```

### Create Rental

#### Request

```json
POST /api/rentals
Authorization: Bearer {accessToken}

{
  "gearId": "gear123",
  "startDate": "2024-01-15",
  "endDate": "2024-01-20",
  "quantity": 1
}
```

#### Response

```json
{
  "success": true,
  "message": "Rental created successfully",
  "data": {
    "id": "rental123",
    "gearId": "gear123",
    "customerId": "customer123",
    "startDate": "2024-01-15",
    "endDate": "2024-01-20",
    "quantity": 1,
    "totalPrice": 125,
    "status": "PENDING"
  }
}
```

---

## Error Handling

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

### Common Error Codes

- `400` - Bad Request (Validation errors)
- `401` - Unauthorized (Invalid/missing token)
- `403` - Forbidden (Insufficient permissions)
- `404` - Not Found
- `409` - Conflict (e.g., duplicate entry)
- `500` - Internal Server Error

---

## Security Features

### 1. **JWT Authentication**

- Access Token (24h expiry)
- Refresh Token (7d expiry)
- Stored in httpOnly cookies

### 2. **Middleware Protection** (`proxy.ts`)

- Validates all protected routes
- Automatic token refresh
- Role-based access control
- Suspended user detection

### 3. **User Status Checks**

- Middleware checks status on dashboard routes
- Dashboard layout validates status
- Client-side polling for status updates
- Immediate logout on suspension

### 4. **Authorization Layers**

- Middleware-level route protection
- Component-level role checks
- API-level permission validation

---

## Environment Variables

Required in `.env` and `.env.local`:

```env
# Backend API
BACKEND_API_URL=http://localhost:5001
NEXT_PUBLIC_API_URL=http://localhost:5001

# JWT Secrets
JWT_ACCESS_SECRET=your-access-secret
JWT_REFRESH_SECRET=your-refresh-secret

# Stripe (for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

---

## File Structure Summary

```
app/
├── (auth)/
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── _action/authAction.ts
│   └── _components/
│       ├── loginForm.tsx
│       └── registerForm.tsx
├── (public)/
│   ├── page.tsx (Home)
│   ├── gears/
│   │   ├── page.tsx (Listing)
│   │   └── [id]/page.tsx (Details)
│   ├── _action/
│   │   ├── getAllGear.ts
│   │   ├── getGearById.ts
│   │   ├── getCategory.ts
│   │   └── bookOrder.ts
│   └── _components/
│       ├── GearList.tsx
│       ├── GearCard.tsx
│       ├── BookingModal.tsx
│       └── Filters/
├── (dashboard)/
│   ├── layout.tsx
│   ├── customer-dashboard/
│   │   ├── page.tsx
│   │   ├── orders/page.tsx
│   │   ├── orders/[id]/page.tsx
│   │   └── payments/page.tsx
│   ├── provider-dashboard/
│   │   ├── page.tsx
│   │   ├── gears/page.tsx
│   │   └── orders/page.tsx
│   ├── admin-dashboard/
│   │   ├── page.tsx
│   │   ├── users/page.tsx
│   │   └── categories/page.tsx
│   ├── _action/
│   │   ├── dashboardOverview.ts
│   │   ├── getAllUsers.ts
│   │   ├── updateUserStatus.ts
│   │   ├── providerGearList.ts
│   │   ├── postGearItem.ts
│   │   ├── updateGearItem.ts
│   │   ├── deleteGearItem.ts
│   │   ├── getIncomingOrders.ts
│   │   ├── updateOrderStatus.ts
│   │   ├── postCategory.ts
│   │   └── deleteCategory.ts
│   └── _component/
│       ├── Sidebar.tsx
│       ├── DashboardHeader.tsx
│       ├── GearFormDialog.tsx
│       ├── OrderRow.tsx
│       └── ...
├── api/
│   └── auth/
│       └── status/route.ts
service/
├── getMe.ts
├── logout.ts
├── refreshToken.ts
├── dashboard/customer/
│   ├── getMyOrder.ts
│   ├── getRentalOrderDetails.ts
│   ├── getPaymentHistory.ts
│   └── payment.ts
└── review/
    ├── createReview.ts
    ├── updateReview.ts
    ├── deleteReview.ts
    └── getGearReview.ts
lib/
├── validations/
│   ├── auth.schema.ts
│   └── gear.schema.ts
├── auth/
│   ├── checkUserStatus.ts
│   ├── getUserStatus.ts
│   └── debugUserStatus.ts
└── types/types.ts
proxy.ts (Middleware)
```

---

## Testing & Debugging

### Debug Utilities

1. **User Status Debug**

   ```typescript
   import { debugUserStatus } from "@/lib/auth/debugUserStatus";
   const debug = await debugUserStatus();
   console.log(debug);
   ```

2. **Check User Status**
   ```typescript
   import { getUserStatus } from "@/lib/auth/getUserStatus";
   const { success, status } = await getUserStatus();
   ```

### Client-Side Status Polling

Use the `useUserStatus` hook in dashboard components:

```typescript
import { useUserStatus } from "@/hooks/useUserStatus";

function DashboardPage() {
  useUserStatus(30000); // Check every 30 seconds
  // ...
}
```

---

## Deployment Checklist

- [ ] Set correct `BACKEND_API_URL` in production
- [ ] Configure JWT secrets
- [ ] Set up Stripe production keys
- [ ] Enable HTTPS for cookie security
- [ ] Configure CORS on backend
- [ ] Test all role-based access controls
- [ ] Verify suspended user redirects
- [ ] Test token refresh flow
- [ ] Validate payment integration

---

## Support & Maintenance

**Last Updated**: January 2024  
**Next.js Version**: 15.x  
**Documentation Version**: 1.0

For issues or updates, please refer to the project repository or contact the development team.
