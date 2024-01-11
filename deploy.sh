#!/bin/sh
mv ../docker-compose-prod.yml .
cat docker-compose-prod.yml
docker compose -f docker-compose-prod.yml up --build
