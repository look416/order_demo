FROM node:14.5
# Env
# ENV TIME_ZONE=Asia/Hong_Kong
# ENV ENV_NAME dev
# ENV EGG_SERVER_ENV dev
# ENV NODE_ENV dev
# ENV NODE_CONFIG_ENV dev

# Create Directory for the Container
WORKDIR /usr/src/app
# Only copy the package.json file to work directory
COPY package.json .
# Install all Packages
RUN npm install
# Copy all other source code to work directory
ADD . /usr/src/app
# TypeScript
RUN npm run build
# Start
CMD [ "npm", "start" ]
EXPOSE 9000