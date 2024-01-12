FROM python:3.11-alpine

ENV PYTHONUNBUFFERED 1

COPY requirements.txt .
RUN pip3 install -r requirements.txt


COPY ./compose/local/django/start /start
RUN sed -i 's/\r//' /start
RUN chmod +x /start


WORKDIR /app
