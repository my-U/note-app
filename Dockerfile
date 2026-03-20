FROM node:22
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# src/main.ts ──▶ (RUN npm run build) ──▶ dist/main.js
# 빌드 과정에서 파일과 디렉토리가 변환됨
# 변환된 dist/main.js 파일 실행
CMD [ "node", "dist/main.js" ]