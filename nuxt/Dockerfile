# base node image
FROM node:23-alpine AS base

# set for base and all layer that inherit from it
ENV NODE_ENV=production

# Install all node_modules, including dev
FROM base AS deps
WORKDIR /nuxt
ADD package.json package-lock.json ./
RUN npm install --include=dev

# Setup production node_modules
FROM base AS production-deps
WORKDIR /nuxt
COPY --from=deps /nuxt/node_modules /nuxt/node_modules
ADD package.json package-lock.json ./
RUN npm prune 

# Build the app
FROM base AS build
WORKDIR /nuxt
COPY --from=deps /nuxt/node_modules /nuxt/node_modules
ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base
WORKDIR /nuxt
COPY --from=production-deps /nuxt/node_modules /nuxt/node_modules
COPY --from=build /nuxt/.output /nuxt/.output
COPY --from=build /nuxt/package.json /nuxt/package.json

CMD ["node", ".output/server/index.mjs"]