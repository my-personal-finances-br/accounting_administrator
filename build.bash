docker build -t lucasehonda/accounting_administrator_backend .
docker push lucasehonda/accounting_administrator_backend

cd frontend/accouting_admin

docker build -t lucasehonda/accounting_administrator_frontend -f Dockerfile.react .
docker push lucasehonda/accounting_administrator_frontend
