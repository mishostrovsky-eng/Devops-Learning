FROM nginx:alpine

# מעתיק את כל הקבצים מתיקיית ה-frontend אל תיקיית הבסיס של Nginx
COPY . /usr/share/nginx/html/

# מעתיק את קובץ הקונפיגורציה אל תיקיית ההגדרות של Nginx כדי שידרוס את ברירת המחדל
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80