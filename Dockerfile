# build environment

# pull official base image
FROM node:current-alpine3.13 as build
# set working directory
WORKDIR /ett2
# add `/ett2/node_modules/.bin` to $PATH
ENV PATH /ett2/node_modules/.bin:$PATH
# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
RUN npm install
RUN npm install react-scripts@4.0.3 -g
# add ett2
COPY . ./
# build only
RUN npm run build

# production environment

# This is a web app so we must deploy a web server - nginx
FROM nginx:stable-alpine
# Heroku dynamically assigns the web port at Dyno startup
# So it is necessary to apply the $PORT env variable to the nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf.template
# Our entire web app is copied to the nginx root - the location from which pages are served
COPY --from=build /ett2/build /usr/share/nginx/html
# Heroku will place the react server port in the $PORT env variable
# /bin/sh must be invoked to substitute the $PORT env variable into the nginx config
# Then nginx is started. daemon off is required under Docker & Heroku
CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
