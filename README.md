# 🏫 SchoolAudit — Northern Cape Furniture & Infrastructure Audit System

A web-based audit management system built for the **Northern Cape Department of Education — Physical Resources Planning** directorate.

---

## 🌐 Live App

👉 **[https://puseletsotshabangu.github.io/furniture-audit-app-offline/](https://puseletsotshabangu.github.io/furniture-audit-app-offline/)**

No installation required. Works in any modern browser on desktop, tablet, or mobile.

---

## 📋 Features

### Core Audit Modules
| Module | Description |
|---|---|
| 📊 Dashboard | Summary stats — schools, shortage, risk level, warehouse status |
| 🗃️ EMIS Database | Search, filter and import NC schools from uploaded EMIS master list |
| 🏫 Audit Schools | Manage schools with capacity, enrolment, teachers and risk |
| 📋 Audits | Record yearly school audits with risk ratings and recommendations |
| 🚪 Classrooms | Track rooms by grade, type, learner count and mobile status |
| 🪑 Furniture | DBE-approved furniture inventory with damage and repair tracking |
| 🔍 Conditions | Infrastructure assessments (flooring, windows, locks, electricity) |
| 🔧 Repairs | Log and track repair jobs sent to warehouse or labour department |
| 🏭 Warehouse | Track new furniture deliveries — stock, reserved, and dispatched |
| 🚚 Distribution | Record furniture deliveries and collections with official sign-off |
| 📦 Storage | Manage school storage rooms and stored furniture |
| 📐 Capacity Analysis | Visual capacity vs enrolment with mobile classroom calculations |
| 👩‍🏫 Ratio Analysis | Teacher-to-learner ratio per school with 1:35 benchmark |
| 📤 Export / Reports | Download any section as a CSV file |

### EPMDS / KPA Modules
| Module | KPA | Weight |
|---|---|---|
| 🖥️ Data Uploads | KPA 1 — NEIMS / EFMS / GOVERP upload tracking | 30% |
| 📈 Learner Data | KPA 2 — Learner number verification & variance | 20% |
| 🚌 Mobile Audit | KPA 3 — Mobile classroom condition assessment | 20% |
| 🏗️ School Requests | KPA 4 — District infrastructure request tracking | 15% |
| 🗂️ Admin & Payments | KPA 5 — Payment verification, filing, stakeholder enquiries | 15% |

---

## 🗃️ Loading the Full EMIS School List

1. Open the app → click **🗃️ EMIS Database** in the sidebar
2. Click **"Choose file"** in the blue upload panel
3. Select your EMIS master list (`.csv` or `.txt`, tab-separated)
4. All NC schools load instantly — filtered to `Province = NC` only

### Expected EMIS file columns:
```
EmisCode | PROVINCE | Institution name | District | Legal Status |
Practical Status of the institution | Sector | Institution Type |
Institution Phase | LandOwnership | Circuit | City/Town |
TelCode1 | Telephone1 | EMail | EmailAlt | LONGITUDE | LATITUDE |
ExamCentreNumber | ExamCentre
```

---

## 📤 Exporting Data

- Every section has a **⬇ CSV** button to download that section's data
- The **📤 Export / Reports** page provides 11 individual exports

---

## 🗂️ File Structure

```
furniture-audit-app-offline/
├── index.html      # App entry point
├── style.css       # Base layout and reset styles
├── app.js          # Full React application (all logic, UI, forms, pages)
└── README.md       # This file
```

---

## 🛠️ Technology

- **React 18** (production CDN build — no npm/node required)
- **Babel Standalone** (JSX compiled in-browser)
- **Vanilla CSS** (no framework dependencies)
- Runs fully in the browser — **no server, no database, no backend**

> **For production at scale:** replace Babel CDN with a Vite or CRA build for faster load times.

---

## 🚀 Deployment

### GitHub Pages
1. Push all 4 files to the repo root
2. Go to **Settings → Pages → Deploy from branch: main / root**
3. App is live at `https://puseletsotshabangu.github.io/furniture-audit-app-offline/`

### Vercel
1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo
3. No build settings needed — deploy as static site
4. App is live at a Vercel URL instantly

---

## 🏛️ Built For

**Northern Cape Department of Education**  
Directorate: Infrastructure — Physical Resources Planning  
Officer: PY Tshabangu · Senior Administration Officer  
Performance Cycle: 2026/2027

---

## 📞 Support

For issues or feature requests, open a [GitHub Issue](https://github.com/Puseletsotshabangu/furniture-audit-app-offline/issues).