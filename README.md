build -t txtjrnl .
docker run -v $(pwd):/app -p 3333:3333 txtjrnl