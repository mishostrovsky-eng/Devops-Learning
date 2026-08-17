FROM nginx:alpine

# מעתיק רק את קבצי האתר הסטטיים לתיקיית היעד
COPY index.html style.js app.js /usr/share/nginx/html/
# (או לחלופין אם יש תיקייה שלמה, תדאגי שקובץ ה-conf לא יועתק לשם)

# מעתיק את קובץ ההגדרות של Nginx למקום המיועד לו
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80