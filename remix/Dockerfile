FROM node:21-bullseye-slim
WORKDIR /myapp
ADD . .
RUN npm install
RUN npm run build

ENV PORT="3030"
ENV HOST=0.0.0.0
CMD ["node", "./server.js"]