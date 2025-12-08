# Architecture Document

This document explains the full architecture of the Retail Sales Dashboard, including backend design, frontend structure, data flow, and module responsibilities.

---

## 1. Backend Architecture

### **Tech**
- Node.js  
- Express.js  
- CSV → JSON loader  
- REST API (single endpoint)

### **Structure**
backend/
│── data/
│ └── dataset.json
│── server.js
│── package.json

### **Flow**
1. The CSV dataset was converted into **sales.json**.
2. Express.js serves the dataset through a REST endpoint:
   - `GET /api/sales` → returns all sales records.
3. No external DB is used; data is read from JSON.
4. CORS enabled so React frontend can consume API.

### **Key Responsibilities**
- Serve clean sales data to the frontend.
- Handle API request and response.
- Maintain dataset integrity.
- Ensure fast access (in-memory JSON load).

---


## 2. Frontend Architecture

### **Tech**
- React.js  
- Functional Components  
- Hooks (useState, useEffect)  
- CSS (custom styling)

### **File Structure**
frontend/
│── src/
│ │── App.jsx
│ │── styles.css
│ │── dataFetch.js (optional helper)
│ └── index.js
│── public/
└── package.json

### **Core UI Sections**
1. **Search bar**
2. **Filters**  
   - Region  
   - Gender  
   - Age Range  
   - Product Category  
   - Tags (multi-select with checkbox dropdown)  
   - Payment Method  
   - Date Range  
3. **Sorting**  
   - Customer Name (A–Z)  
   - Date (Newest First)  
   - Quantity  
4. **Pagination** (10 items per page)
5. **Responsive Data Table**

---

## 3. Data Flow Architecture

### **Step-by-step Flow**
User Action → Filters/Search/Sorting → App State Updates →Filtered & Sorted Data → Paginated Data→ Table Updates

### **Explanation**
1. **Frontend fetches full dataset** from:
GET /api/sales
2. Data is stored in state:
- `allData`
- `filteredData`
3. When user interacts:
- Search text updates → filters run again
- Filter dropdown changes → filters combine
- Sorting selected → reordering happens
- Pagination → slices filteredData into pages
4. Table re-renders with final computed data.

### **Filtering Logic**
All filters are **independent** but also work **in combination**, in this order:

1. Search  
2. Region  
3. Gender  
4. Age Range  
5. Product Category  
6. Tags  
7. Payment Method  
8. Date Range  

Every filter narrows the previously reduced dataset.

---

## 4. Folder Structure
project-root/
│── backend/
│── frontend/
│── docs/
│ └── architecture.md
└── README.md


---

## 5. Module Responsibilities

### **App.jsx**
- Fetches data from backend  
- Stores full dataset & filtered dataset  
- Applies:
  - Search
  - Multi-select Filters
  - Tags checkbox dropdown
  - Sorting logic
  - Pagination logic  
- Controls UI rendering

### **styles.css**
- Full UI styling  
- Table design  
- Button and filter styling  
- Dropdown animations  
- Responsive layout

### **server.js**
- Creates backend server  
- Loads JSON data  
- Handles API routes  
- Sends data to frontend

### **sales.json**
- Contains all transformed sales records

---

## 6. Final Architecture Summary

This project uses a **clean, modular, full-stack architecture**:

### **Backend**
- Lightweight Express API  
- Single JSON dataset loaded in memory  
- Simple & fast

### **Frontend**
- React state-driven UI  
- Highly dynamic filters  
- Fully controlled components  
- Professional dashboard experience  

### **Communication**
- REST API → JSON → React state

This structure ensures:
- Fast load time  
- Clean separation of concerns  
- Easy maintainability  
- 100% meets assignment requirements  

---

FINAL PROJECT STRUCTURE:
project-root/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── data/
│        └── dataset.json
│
├── frontend/
│   ├── package.json
│   ├── index.html  (inside public/)
│   └── src/
│        ├── App.jsx
│        ├── styles.css
│        └── index.js
│
├── docs/
│   └── architecture.md   
│
└── README.md  


