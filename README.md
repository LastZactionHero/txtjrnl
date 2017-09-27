build -t txtjrnl .
docker run -v $(pwd):/app -p 3333:3333 txtjrnl
docker run -it -v $(pwd):/app -p 3333:3333 txtjrnl /bin/bash


docker-compose run --service-ports receiver bash
node app.js

https://requestb.in/1cz2hrd1?inspect