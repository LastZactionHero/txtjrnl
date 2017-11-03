FROM node
VOLUME /app

EXPOSE 3333

RUN npm install -g brunch

# Yarn Package
RUN curl -o- -L https://yarnpkg.com/install.sh | bash

RUN apt-get update
RUN apt-get -y install bundler
RUN gem install sass

WORKDIR /app
RUN yarn install --no-bin-links

CMD brunch watch -s -n