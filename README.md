# workspace-blog

How to run:
-clone the repository.

Install & Config database:
- sudo apt update
- sudo apt install postgresql postgresql-contrib
- sudo systemctl start postgresql.service
- sudo -u postgres psql
- CREATE DATABASE blog_db;
- CREATE USER admin WITH PASSWORD 'password';
- GRANT ALL PRIVILEGES ON DATABASE blog_db  TO admin;

To run backend
- cd backend
- source venv/bin/activate
- python manage.py makemigrations
- python manage.py migrate
- python manage.py createsuperuser
- ** provide username, email, password
- python manage.py runserver
- http://127.0.0.1:8000/

To run frontend
- cd www
- npm i
- ng serve
- http://localhost:4200/

NOTE:
- If CORS gives error then add CORS plugin in browser
