readme_content = """# 💳 Digital Wallet Frontend Application

A **secure, role-based, and user-friendly** web application inspired by **bKash** and **Nagad**, built with **React**, **Redux Toolkit**, and **RTK Query**.  
This application enables **Users**, **Agents**, and **Admins** to perform and manage digital financial operations seamlessly — all through a modern, responsive, and intuitive interface.

---

## 🚀 Table of Contents
1. [Introduction](#-introduction)  
2. [Features](#-features)  
3. [Tech Stack](#-tech-stack)  
4. [Project Structure](#-project-structure)  
5. [Installation](#-installation)  
6. [Configuration](#-configuration)  
7. [Usage](#-usage)  
8. [Role-Based Dashboards](#-role-based-dashboards)  
9. [UI/UX Enhancements](#-uiux-enhancements)  
10. [API Integration](#-api-integration)  
11. [State Management](#-state-management)  
12. [Guided Tour](#-guided-tour)  
13. [Testing](#-testing)  
14. [Troubleshooting](#-troubleshooting)  
15. [Contributors](#-contributors)  
16. [License](#-license)

---
credential admin : admin123@gmail.com
pass : Tanver@#$321
 agent: fiha@gmail.com
pass : Tanver@#$321
user : tanver@gmail.com
pass : Tanver@#$321

## 🧭 Introduction

This **Digital Wallet Frontend App** provides a role-based platform for financial transactions between Users, Agents, and Admins.  

It consumes a RESTful backend API (Node.js/Express) for all operations including:
- Authentication (JWT-based)
- Wallet management
- Transactions
- Role-based authorization

Built with modern frontend tools, it ensures a **highly secure**, **responsive**, and **polished** user experience.

---

## ✨ Features

### 🏠 Public Landing Section
- **Home Page** — Hero banner, navigation bar, and CTA buttons  
- **About Page** — Mission, story, and team section  
- **Features Page** — Feature list with icons and visuals  
- **Pricing Page** *(optional)* — Tiered pricing and service fees  
- **Contact Page** — Inquiry form (simulated)  
- **FAQ Page** — Common user questions  
- **Responsive Design** — Works on all devices  
- **Smooth Transitions & Skeleton Loaders** for better UX  

---

### 🔐 Authentication
- **JWT-based authentication** (login & registration)
- **Role selection** during signup (`User`, `Agent`)
- **Persistent login state** using localStorage
- **Role-based redirection** post-login
- **Logout functionality**

---

### 👤 User Dashboard
- Wallet overview & balance
- Deposit, Withdraw, and Send Money
- Transaction History (filter, paginate)
- Profile update (name, phone, password)

---

### 🧾 Agent Dashboard
- Cash-in / Cash-out simulation
- Manage user wallet transactions
- Commission tracking *(optional)*
- Personal profile management

---

### 🛠️ Admin Dashboard
- Manage users & agents (approve/block)
- View & filter all transactions
- System analytics (users, volume, transaction count)
- Adjustable service fees/limits *(optional)*
- Admin profile management

---

## ⚙️ Tech Stack

### Frontend
- **React.js** (UI framework)  
- **TypeScript** (type safety)  
- **Redux Toolkit + RTK Query** (state & API management)  
- **React Router DOM** (routing)  
- **Tailwind CSS** (styling)  
- **React Icons**, **Heroicons** (icons)  
- **react-toastify** (toast notifications)  
- **react-joyride / driver.js** (guided tours)

### Backend (for reference)
- **Node.js / Express.js**
- **MongoDB / Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing

---

## 📁 Project Structure

