FROM ghcr.io/puppeteer/puppeteer:22.12.1

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
CMD [ "node", "index.js" ]

