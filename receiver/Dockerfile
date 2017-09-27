FROM node
VOLUME /app

EXPOSE 3333

COPY ./firebase-key.json /root/firebase-key.json

WORKDIR /app
RUN npm install --no-bin-links
CMD node ./app.js