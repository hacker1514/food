# 🚩 Sri Skanda Home Foods | Traditional Brahmin Sweets & Podis

[![Python Server](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline--Enabled-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](public/manifest.json)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%20v3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Status](https://img.shields.io/badge/Production-Active-success?style=for-the-badge)]()

Welcome to the official repository for **Sri Skanda Home Foods** — an executive web application and management platform for authentic, garlic-free South Indian Brahmin podis, traditional sweets, and organic millet snacks prepared in pure cow ghee.

---

## 🌟 Executive Features Overview

### 🛒 Customer Storefront (`public/index.html`)
* **Authentic Heritage Menu**: Dynamic catalog of traditional Podis, Sweets, and Custom Millet options.
* **Weight-Based Pricing Pills**: Seamless selection between `100g`, `250g`, `500g`, and `1kg` packs with automatic price recalculation.
* **WhatsApp Ordering & Cart Auto-Reset**: 1-click WhatsApp order generation with formatted receipts and automatic cart reset to 0 items upon submission.
* **Live Order Tracking & My Orders Drawer**:
  * **LocalStorage Persistence**: Placed orders are saved locally in the browser.
  * **Live Kitchen Sync**: Synchronizes with the backend database (`/api/customer/sync-orders`). Orders deleted by store admins automatically clear from the customer's order history.
  * **Interactive Detailed Receipt Modal**: Clicking any order card opens an itemized receipt with live status progress (Received ➔ Confirmed ➔ Dispatched ➔ Delivered), unit prices, quantities, and delivery details.
  * **Phone Order Retrieval**: Look up past orders anytime across devices using a customer phone number.
* **Progressive Web App (PWA)**:
  * Full offline caching via Service Worker (`public/sw.js`).
  * Web App Manifest (`public/manifest.json`) supporting standalone app installation on Mobile & Desktop.
  * Smart bottom-left app installation recommendation banner.
* **AI Knowledge Assistant**: Integrated chatbot powered by Groq LLM API providing instant advice on products, health benefits, and shipping.

---

### 🛡️ Executive Admin Management Portal (`public/admin.html`)
* **Security Passcode Protection**: Protected by server-side passcode verification (Default PIN: `1514`).
* **In-App Passcode Management**: Admins can change their passcode directly inside the portal (`/api/admin/change-pin`) with immediate persistence.
* **Instant Keyboard Shortcut**: Pressing single key **`a`** or **`A`** anywhere on the customer storefront clears existing session credentials and opens the passcode prompt for quick access.
* **Live Orders Management**: View customer orders, filter by status (`Pending`, `Confirmed`, `Processing`, `Delivered`, `Cancelled`), search by customer name/phone/reference, update progress, or delete orders.
* **Store Inventory & Pricing Editor**: Add, edit, or delete store menu items and pack pricing dynamically.
* **Executive Sales Analytics**: Real-time revenue counters, total order stats, and delivery status monitors.

---

## 📂 Project Architecture

```
TastyIgniter/
├── server.py                   # Lightweight HTTP Server & REST API Provider
├── database/
│   └── store_data.json         # Persistent JSON Database (Orders, Menu, Admin PIN)
└── public/
    ├── index.html              # Customer Storefront Application
    ├── admin.html              # Executive Admin Management Portal
    ├── app.js                  # Storefront Interactive Logic & LocalStorage Sync
    ├── admin.js                # Admin Portal Logic & Passcode Management
    ├── sw.js                   # PWA Offline Service Worker
    ├── manifest.json           # Progressive Web App Manifest Configuration
    ├── app-logo-192.png        # PWA Icon 192x192
    ├── app-logo-512.png        # PWA Icon 512x512
    └── images/                 # Product Images & Brand Assets
```

---

## 🔌 REST API Documentation

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/menu` | Fetch live store menu & pack pricing | No |
| `POST` | `/api/orders` | Create a new customer order | No |
| `POST` | `/api/customer/sync-orders` | Fetch active customer orders by IDs or Phone | No |
| `POST` | `/api/admin/login` | Authenticate Admin passcode | No |
| `POST` | `/api/admin/change-pin` | Update Admin security passcode | Yes |
| `GET` | `/api/admin/orders` | Fetch all store orders with filters | Yes |
| `PATCH` | `/api/admin/orders/<id>` | Update order status or payment status | Yes |
| `DELETE` | `/api/admin/orders/<id>` | Delete an order record | Yes |
| `POST` | `/api/admin/menu` | Add a new menu item | Yes |
| `PUT` | `/api/admin/menu/<id>` | Edit an existing menu item | Yes |
| `DELETE` | `/api/admin/menu/<id>` | Delete a menu item | Yes |
| `POST` | `/api/chat` | AI Customer Assistant Chatbot Query | No |

---

## 🚀 Quick Start & Installation

### Prerequisites
* Python **3.8+** installed on your system.

### 1. Launch Server
Run the lightweight Python backend daemon:
```bash
python server.py
```
The server will start at `http://127.0.0.1:8000`.

### 2. Access Applications
* **Customer Storefront**: Open `http://127.0.0.1:8000` in your web browser.
* **Admin Portal**: Open `http://127.0.0.1:8000/admin.html` or press key **`a`** / **`A`** on the storefront.
* **Default Admin Passcode**: `1514`

---

## 🚩 Brand Quality Assurance

* **100% Pure Cow Ghee**: Made using traditional churning methods.
* **Garlic-Free Brahmin Recipe**: Authentic family heritage formulations.
* **No Added Preservatives**: Freshly prepared in small batches.
* **Nationwide Shipping**: Safe food-grade vacuum packing delivered across India.

---

## 📄 License & Credits

© 2026 **Sri Skanda Home Foods**, Madanapalle, Andhra Pradesh, India. All Rights Reserved.
