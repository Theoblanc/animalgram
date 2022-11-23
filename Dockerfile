FROM node:14 as base

WORKDIR /app/

COPY ./package.json ./
# RUN yarn set version berry
# RUN yarn plugin import workspace-tools
COPY ./.yarn ./.yarn
COPY ./.pnp* ./
COPY ./.yarnrc.yml ./
COPY ./yarn.lock ./

# Copy TS files
COPY ./tsconfig.json ./
COPY ./tsconfig.build.json ./

FROM base as server-development
WORKDIR /app/packages/server
COPY  packages/server .
WORKDIR /app/packages/server

FROM base
COPY --from=server-development /app/packages/server /app/packages/server

RUN yarn install