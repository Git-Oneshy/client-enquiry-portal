### Client Enquiry & Task Tracking Portal

The **Client Enquiry & Task Tracking Portal** is a full-stack MERN (MongoDB, Express.js, React, Node.js) web application designed for centralizing client intake, service request management, and operational tracking. It automates enquiry assignments, streamlines status workflows, and enforces role-based operational permissions across departments—such as Sales, Technical Support, Billing, and Project Operations.

---

### Core Architecture & System Specifications

* **Frontend Architecture:** Built with **React** and **Vite**, featuring dynamic Single Page Application (SPA) client-side routing, modular component structures, and client-side state management using React Hooks (`useState`, `useEffect`).
* **Backend REST API:** Engineered with **Node.js** and **Express.js** using a modular controller-route architecture to manage CRUD operations for client enquiries and user accounts.
* **Database & Persistence:** Data persistence managed through **MongoDB** and **Mongoose ODM**, enforcing schemas for user credentials and enquiry ticket documents.
* **Authentication & Security:** Secure user authentication utilizing **JSON Web Tokens (JWT)** stored in `localStorage`, password hashing via **bcryptjs**, and custom authentication middleware protecting private API endpoints.

---

### Key Features & Workflow Capabilities

#### 1. Role-Based Access Control (RBAC)

The platform tailors operational capabilities based on three distinct organizational roles:

* **Admin (Full Control):** Full permissions to log new enquiries, edit task details, update lifecycle statuses, access account settings, and permanently delete client records.
* **Staff / Operator:** Operational access to log incoming client requests, update status pipelines, and manage assigned deliverables.
* **Viewer (View-Only Queue):** Restricted read-only access designed for monitoring active queues and project progress without record modification rights.

#### 2. Comprehensive Project Intake & Lifecycle Management

* **Structured Data Intake:** Dedicated fields for client/company names, email addresses, enquiry categories, assigned internal team leads, and target completion deadlines.
* **Live Status Tracking:** Real-time progression across project lifecycle stages (`New` ➔ `In Progress` ➔ `Closed`).
* **Interactive Filtering & Search:** Dynamic client-side filtering by ticket status alongside multi-field string searching across client names, category types, and assigned team members.

#### 3. Isolated Account & Security Management

* **Dedicated User Settings:** An isolated settings interface for team members to update account credentials securely.
* **Password Management:** Secure password updating utilizing Mongoose pre-save hooks to automatically hash new password inputs.
* **Account Self-Deletion:** Self-service account termination option protected by browser confirmation modal checks and protected backend routes.

---

### Technology Stack Summary

| Layer | Technologies & Libraries |
| --- | --- |
| **Frontend** | React, Vite, Axios, Pure CSS / Custom Component Styles |
| **Backend** | Node.js, Express.js, CORS, Dotenv, JsonWebToken, BcryptJS |
| **Database** | MongoDB, Mongoose ODM |
| **API Architecture** | RESTful JSON API with Express Router |
