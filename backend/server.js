const express = require('express');
const cors = require('cors'); // הוספת הייבוא
const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // הוספת המידלווייר שמאפשר לפרונט לדבר עם הבק

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Spidey Backend Server! 🕷️' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is up and running!', timestamp: new Date() });
});

app.listen(port, () => {
  console.log(`Backend server is listening on port ${port}`);
}); 