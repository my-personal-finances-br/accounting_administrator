#!/bin/sh
mv ../docker-compose-prod.yml .
cat docker-compose-prod.yml
docker compose down
docker compose -f docker-compose-prod.yml up --build
rm docker-compose-prod.yml
