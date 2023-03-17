format_code:
	isort -rc .
	black . --exclude .ipython,.ipython/* --line-length=90
	flake8 . --exclude .git,__pycache__,settings.py,old,build,dis,manage.py,/migrations/, --max-line-length=90 --ignore=E501,W503

coverage:
	coverage run -m pytest
	coverage html

makemigrations:
	docker-compose run django python manage.py makemigrations

migrate:
	docker-compose run django python manage.py migrate

makemessages:
	docker-compose run django python manage.py makemessages --locale=pt_BR

test: compilemessages
	docker-compose run django pytest -vv . --cov career_management/

compilemessages:
	docker-compose run django python manage.py compilemessages

shellplus:
	docker-compose run django python manage.py shell_plus

dbshell:
	docker-compose run django python manage.py dbshell

postgres_up:
	docker-compose up postgres

local_setup:
	make migrate
	docker-compose run django python manage.py runscript local_setup

create_super_user:
	docker-compose run django python manage.py createsuperuser

up:
	docker-compose up

up_front:
	cd frontend/ && yarn dev

down:
	docker-compose down