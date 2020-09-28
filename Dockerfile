# base image
FROM node:12.2.0

# install chrome for protractor tests
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
# RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
# RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@8.3.23

# add app
COPY . /app

# start app
# CMD ng serve --host 192.168.181.133 --port 4200
CMD ng serve --host 0.0.0.0

# ===================================================================================================================================

# ### STAGE 1: Build ###    
# # We label our stage as 'builder'
# FROM node:12.2.0

# COPY package.json package-lock.json ./

# RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

# ## Storing node modules on a separate layer will prevent 
# ## unnecessary npm installs at each build
# RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

# WORKDIR /ng-app

# COPY . .

# ## Build the angular app in production mode and store the artifacts in dist folder
# RUN $(npm bin)/ng build --prod --build-optimizer


# ### STAGE 2: Setup ###

# FROM nginx:1.18.0-alpine

# ## Copy our default nginx config
# COPY nginx/default.conf /etc/nginx/conf.d/

# ## Remove default nginx website
# RUN rm -rf /usr/share/nginx/html/*

# ## From 'builder' stage copy over the artifacts in dist folder 
# ## to default nginx public folder
# COPY --from=builder /ng-app/dist /usr/share/nginx/html

# CMD ["nginx", "-g", "daemon off;"]