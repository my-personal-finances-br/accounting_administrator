#!/bin/sh
mv ../docker-compose-prod.yml .
cat docker-compose-prod.yml
sudo docker compose down
sudo docker compose -f docker-compose-prod.yml up --build -d
rm docker-compose-prod.yml
