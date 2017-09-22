FROM node
VOLUME /app

EXPOSE 3333

RUN npm install -g brunch

WORKDIR /app
CMD brunch watch -s -n