const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(express.json());

// Firebase Admin Setup
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Vercel এর এনভায়রনমেন্ট ভেরিয়েবল ঠিক করার জন্য replace ব্যবহার করা হয়েছে
      privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
    }),
    databaseURL: "https://bpi-blood-donors-finder-online-default-rtdb.firebaseio.com"
  });
}

// সার্ভার ঠিকমতো চলছে কি না তা চেক করার জন্য একটি টেস্ট রাউট
app.get('/', (req, res) => {
  res.send('BPI Blood Finder Backend is Running smoothly! 🚀');
});

// পরবর্তী ধাপে আমরা এখানে Passkey-এর API গুলো যুক্ত করবো

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
