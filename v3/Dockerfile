FROM node:17.9.1-alpine as base

RUN apk --no-cache --virtual build-dependencies add bash

WORKDIR /project

COPY package.json .

RUN yarn

COPY polywrap.yaml .

COPY polywrap.build.yaml .

COPY src/pool src/pool

COPY src/position src/position

COPY src/route src/route

COPY src/router src/router

COPY src/swap src/swap

COPY src/tickList src/tickList

COPY src/token src/token

COPY src/trade src/trade

COPY src/utils src/utils

COPY src/index.ts src/index.ts

COPY src/schema.graphql src/schema.graphql

COPY src src

ENV ASYNCIFY_STACK_SIZE=24576

RUN ./node_modules/.bin/asc src/wrap/entry.ts \
  --path ./node_modules \
  --outFile ./build/wrap.wasm \
  --use abort=src/wrap/entry/wrapAbort \
  --optimize --optimizeLevel 3 --shrinkLevel 2 \
  --importMemory \
  --runtime stub \
  --runPasses asyncify
