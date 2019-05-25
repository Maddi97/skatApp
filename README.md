# skatApp

Backend einrichten:

1. MySQL downloaden installieren

!!Wichtig!! Python version > 3.0 verwenden

2. in shell virtualenv einrichten (\$ virtualenv venv --python=python3.6

   und aktivieren -> je nach OS im venv ordner activate ausführen und venv zu starten)

3. in venv shell mit pip bibiotheken installieren ($ pip install pymysql , $ pip install sqlalchemy und \$pip install flask)

4. in zeile 10 in generate_database.py (engine = create_engine('mysql+pymysql://root:password@127.0.0.1')) ist der login für den mysql server

5. es kann sein das beim ersten versuch die Zeile DROP SCHEMA test auskommentiert werden muss, falls es noch keine datenbank test gibt

6. ausführen mit: \$ python database_controller.py

Dependencies: pymysql, sqlalchemy, flask
