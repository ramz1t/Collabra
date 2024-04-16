FROM node:18.16-alpine
WORKDIR /react
COPY package.json .
RUN npm i --legacy-peer-deps
COPY . .

# Заменяем символы CRLF на LF
RUN sed -i "s/\r//" /react/entrypoint.sh

# Устанавливаем права выполнения
RUN chmod +x /react/entrypoint.sh

ENTRYPOINT /bin/sh "/react/entrypoint.sh"