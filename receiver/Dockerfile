FROM node
VOLUME /app

EXPOSE 3333

COPY ./firebase-key.json /root/firebase-key.json


WORKDIR /app
RUN npm install --no-bin-links
# RUN ./node_modules/.bin/jasmine init

CMD npm run server

