#!/bin/sh

ls 
cat docker-compose.yml
cd accounting_administrator
git pull https://${{ secrets.GIT_USER }}:${{ secrets.GIT_TOKEN }}@github.com/my-personal-finances-br/accounting_administrator.git
cd .. && docker-compose up --build
