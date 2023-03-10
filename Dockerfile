FROM node:16-bullseye-slim AS dev

ENV DOCKERIZE_VERSION v0.6.1
ENV NODE_ENV "dev"

RUN apt update && apt install -y wget bash gnupg

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

RUN apt install -y fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
  libgtk2.0-0 libnss3 libatk-bridge2.0-0 libdrm2 libxkbcommon0 libgbm1 libasound2 && apt install -y chromium
RUN apt clean

WORKDIR /home/app

COPY package*.json /home/app/

RUN npm install

COPY . /home/app/

RUN npm run build

RUN chmod +x /home/app/.docker/entrypoint.sh
RUN chmod +x /home/app/scripts/init.sh

ENTRYPOINT [ "./scripts/init.sh" ]
