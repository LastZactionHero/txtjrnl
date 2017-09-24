FROM node
VOLUME /app

EXPOSE 3333

RUN npm install -g brunch

RUN apt-get update
RUN apt-get -y install bundler
RUN gem install sass

WORKDIR /app
RUN npm install --no-bin-links
CMD brunch watch -s -n