FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --only=production
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .
ENV BROKER_HOST=tcp://mr2r9za6fwi0wf.messaging.solace.cloud:1883
ENV BROKER_USR=covid-public-client
ENV BROKER_PWD=covid19
CMD [ "npm", "start" ]