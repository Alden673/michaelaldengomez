# Portfolio backend

Express backend for the Michael Alden Gomez A portfolio.

## Run locally

```powershell
cd backend
npm install
npm start
```

Open `http://localhost:3000` to view the portfolio.

## API

- `GET /api/health` - server health check
- `GET /api/profile` - profile, education, skills, internship, and certifications
- `GET /api/profile/certifications` - certifications only
- `POST /api/contact` - accepts `{ "name": "...", "email": "...", "message": "..." }`

Contact messages are stored in memory and are cleared whenever the server restarts. Add a database before using this endpoint in production.
