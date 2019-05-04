FROM node:alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json yarn.lock /app/
RUN yarn
RUN npm run build

# Bundle app source
COPY . /app

EXPOSE 3000
CMD [ "yarn", "start" ]