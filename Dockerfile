FROM node:6.2.2

# Create app directory
RUN mkdir -p /usr/src/lopc
WORKDIR /usr/src/lopc

# Install app dependencies
COPY package.json /usr/src/lopc/
RUN npm install

# Bundle app source
COPY . /usr/src/lopc

EXPOSE 9002
CMD [ "node", "app.js" ]
