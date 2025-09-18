# MannMitra (Demo Mode)

This build runs **without a backend**.  
It uses demo chat responses + mood logs for hackathon presentations.

## Run Instructions
```bash
npm install
npm run dev
```

- Open http://localhost:5173
- Try Chat + Mood tracker → they will show demo data if backend is missing
- Crisis escalation button will be disabled in demo mode


# Firestore Integration
To enable Firestore, install firebase and provide your firebaseConfig in src/lib/db.ts; set DEMO_MODE=false to persist moods to Firestore.
