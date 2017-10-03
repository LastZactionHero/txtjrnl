FROM node
VOLUME /app

EXPOSE 3333

COPY ./firebase-key.json /root/firebase-key.json

WORKDIR /app

RUN npm install --no-bin-links
RUN npm install -g babel-cli
RUN npm install -g babel-preset-es2015

CMD npm run server

