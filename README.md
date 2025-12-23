# Notice Management System – Frontend

## 🛠 Tech Stack

- **React.js** (Vite)
- **Tailwind CSS**
- **Shadcn UI**
- **React Router DOM**
- **Lucide Icons**

---

## ⚙️ Installation & Run

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd Nebs-IT-frontend
npm install
npm start
```

Frontend will run on:
http://localhost:5173

# 🔑 Environment Variables

Create the following environment files in the frontend root directory.
.env.local
VITE_API_BASE_URL=http://localhost:5000/api

.env.production
VITE_API_BASE_URL=https://your-backend-live-url/api

# ⚡ Functionalities

- Fully UI built from Figma design
- Create Notice form with validation
- Notice Type dropdown (multiple selection supported)
- Save notice as Published or Draft
- Success popup on notice publish
- Draft save without popup (alert only)
- Notice listing table with:
- Search by employee name
- Filter by status (Published / Unpublished / Draft)
- Publish / Unpublish toggle (update)
- Real-time data fetched from backend API
