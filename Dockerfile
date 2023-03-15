FROM python:3.7-alpine

ENV PYTHONUNBUFFERED 1

RUN apk update \
  && apk add build-base \
  # psycopg2 dependencies
  && apk add --virtual build-deps gcc python3-dev musl-dev \
  && apk add postgresql-dev \
  # Pillow dependencies
  && apk add jpeg-dev zlib-dev freetype-dev lcms2-dev openjpeg-dev tiff-dev tk-dev tcl-dev \
  # CFFI dependencies
  && apk add libffi-dev py-cffi \
  # Translations dependencies
  && apk add gettext \
  # https://docs.djangoproject.com/en/dev/ref/django-admin/#dbshell
  && apk add postgresql-client \
  && apk add make

# Requirements are installed here to ensure they will be cached.
RUN pip install pipenv==2022.5.2
COPY Pipfile* ./
RUN pipenv install --dev --system

COPY ./compose/deploy/django/development/entrypoint /entrypoint
RUN sed -i 's/\r//' /entrypoint
RUN chmod +x /entrypoint

COPY ./compose/local/django/start /start
RUN sed -i 's/\r//' /start
RUN chmod +x /start


WORKDIR /app

ENTRYPOINT ["/entrypoint"]
