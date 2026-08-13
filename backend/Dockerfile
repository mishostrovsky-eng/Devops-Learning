# נשתמש בגרסה רזה של Node
FROM node:20-alpine

# קביעת תיקיית העבודה בתוך הקונטיינר
WORKDIR /app

# העתקת קבצי התלויות קודם (כדי לייעל את תהליך ה-Build)
COPY package*.json ./

# התקנת התלויות
RUN npm install --production

# העתקת שאר הקבצים
COPY . .

# חשיפת הפורט
EXPOSE 3000

# הפקודה להרצת השרת
CMD ["node", "server.js"]