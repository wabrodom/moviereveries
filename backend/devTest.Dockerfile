FROM node:22-alpine 

RUN adduser -D -s /bin/sh myworker

WORKDIR /usr/src/app
RUN chown myworker:myworker /usr/src/app

COPY package.json package-lock.json ./
RUN chown myworker:myworker package.json package-lock.json

USER myworker
RUN npm install

USER root
COPY --chown=myworker:myworker . .

USER myworker
CMD ["npm", "run", "start:test"]


# # old Dockerfile
# FROM node:22-alpine
# WORKDIR /usr/src/app
# COPY --chown=node:node . .
# RUN npm install
# USER node
# CMD ["npm", "run", "dev"]