# Retail Sales Management System

## 1. Overview
This project is a full-stack Retail Sales Management System built as part of the TruEstate SDE Intern Assignment.  
It provides advanced search, multi-select filtering, sorting, and pagination over structured sales data.  
The system demonstrates clean architecture, optimized data handling, and a modern production-level UI.  

---

## 2. Tech Stack
**Frontend:** React.js, Axios, CSS3  
**Backend:** Node.js, Express.js  
**Other:** JavaScript (ES6), JSON Data Processing  

---

## 3. Search Implementation Summary
- Full-text search across **Customer Name** and **Phone Number**  
- Case-insensitive matching  
- Runs on the frontend for high responsiveness  
- Works together with filters, sorting, and pagination  
- Automatically resets to page 1 when search query changes  

---

## 4. Filter Implementation Summary
Implemented all required filters:

- **Customer Region** (dropdown)  
- **Gender** (dropdown)  
- **Age Range** (18–25, 26–35, 36–45, 46–55, 56+)  
- **Product Category** (dropdown)  
- **Tags** → *multi-select checkbox dropdown*  
- **Payment Method** (dropdown)  
- **Date Range** (Last 7, 30, 90, 365 days)

Filter Logic:
- All filters work independently  
- All filters work in combination  
- Filters maintain state together with search & sorting  
- Handles invalid or conflicting filter combinations gracefully  

---

## 5. Sorting Implementation Summary
Sorting supports:
- **Date (Newest First)**  
- **Quantity (High → Low)**  
- **Customer Name (A–Z)**  

Sorting Logic:
- Sorting is applied *after* search + filters  
- Sorting maintains state with active filters & pagination  
- Automatically resets pagination to page 1 on sort change  

---

## 6. Pagination Implementation Summary
- Page size = **10 items per page** (as required)  
- Supports **Next / Previous** navigation  
- Dynamic page buttons with windowing (max 7 visible)  
- Pagination maintains state with sorting, search, and filters  
- Handles “No results found” edge cases gracefully  

---

## 7. Setup Instructions

### Backend Setup
```bash
cd backend
npm install
npm start
