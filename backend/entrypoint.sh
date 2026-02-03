#!/bin/bash

python manage.py migrate users teams

python manage.py collectstatic --noinput

python manage.py loaddatautf8 core/data/init.json
python manage.py loaddatautf8 core/data/demo.json

exec daphne -b 0.0.0.0 -p 8241 project.asgi:application