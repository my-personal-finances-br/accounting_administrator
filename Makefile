format_code:
	isort -rc .
	black . --exclude "/\.ipython/|/frontend/" --line-length=90
	prettier --write frontend/accouting_admin/

coverage:
	coverage exec -m pytest
	coverage html

makemigrations:
	docker compose exec django python manage.py makemigrations

migrate:
	docker compose exec django python manage.py migrate

makemessages:
	docker compose exec django python manage.py makemessages --locale=pt_BR

test: compilemessages
	docker compose exec django pytest -vv . --cov career_management/

compilemessages:
	docker compose exec django python manage.py compilemessages

shellplus:
	docker compose exec django python manage.py shell_plus

dbshell:
	docker compose exec django python manage.py dbshell

postgres_up:
	docker compose up postgres

local_setup:
	make migrate
	docker compose exec django python manage.py runscript local_setup

create_super_user:
	docker compose exec django python manage.py createsuperuser

up:
	docker compose up

up-d:
	docker compose up -d

down:
	docker compose down

dump:
	docker compose exec django python manage.py dumpdata > dump.json

restore-db:
	docker compose exec django python manage.py loaddata dump.json
