# FROM debian:bullseye as builder

# ARG NODE_VERSION=14.17.6


# RUN apt-get update; apt install -y curl
# RUN curl https://get.volta.sh | bash
# ENV VOLTA_HOME /root/.volta
# ENV PATH /root/.volta/bin:$PATH
# RUN volta install node@${NODE_VERSION}

# #######################################################################

# RUN mkdir /app
# WORKDIR /app

# COPY package*.json ./
# COPY tsconfig.json ./

# # NPM will not install any package listed in "devDependencies" when NODE_ENV is set to "production",
# # to install all modules: "npm install --production=false".
# # Ref: https://docs.npmjs.com/cli/v9/commands/npm-install#description

# ENV NODE_ENV production

# COPY . .

# RUN npm install typescript
# RUN npm install && npm run build
# FROM debian:bullseye

# LABEL fly_launch_runtime="nodejs"

# COPY --from=builder /root/.volta /root/.volta
# COPY --from=builder /app/build ./build
# COPY --from=builder /app/prisma ./prisma

# WORKDIR /app
# ENV NODE_ENV production
# ENV PATH /root/.volta/bin:$PATH

# CMD [ "npm", "run", "start" ]


FROM node:17-alpine as build-image
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig.json ./
COPY . .
RUN npm ci
RUN npx tsc

FROM node:17-alpine
WORKDIR /usr/app
COPY package*.json ./
COPY --from=build-image ./usr/app/build ./build
COPY --from=build-image ./usr/app/prisma ./prisma
RUN npm ci --production
COPY . .
EXPOSE 8080
CMD [ "node", "build/src/server.js" ]