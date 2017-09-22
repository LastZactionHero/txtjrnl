FROM node
VOLUME /app

EXPOSE 3333

RUN npm install -g brunch

RUN apt-get update
RUN apt-get install bundler
RUN gem install sass

WORKDIR /app
CMD brunch watch -s -n