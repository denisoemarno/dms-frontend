FROM nginx:alpine
COPY /dist/dms_fronend /usr/share/nginx/html
EXPOSE 80