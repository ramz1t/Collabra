FROM python:3.11-slim

WORKDIR /app

COPY . /app

RUN pip3 install -r requirements.txt --no-cache-dir

# Заменяем символы CRLF на LF
RUN sed -i 's/\r//' /app/entrypoint.sh

# Устанавливаем права выполнения
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]
