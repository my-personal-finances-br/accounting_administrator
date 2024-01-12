FROM python:3.11-alpine

ENV PYTHONUNBUFFERED 1

RUN apk update \
  && apk add build-base \
  # psycopg2 dependencies
  && apk add --virtual build-deps gcc python3-dev musl-dev \
  && apk add postgresql-dev \
  # Translations dependencies
  && apk add gettext \
  && apk add make

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip3 install -r requirements.txt

COPY ./compose/deploy/django/development/entrypoint /entrypoint
RUN sed -i 's/\r//' /entrypoint
RUN chmod +x /entrypoint

COPY ./compose/local/django/start /start
RUN sed -i 's/\r//' /start
RUN chmod +x /start


WORKDIR /app

ENTRYPOINT ["/entrypoint"]
