# skatApp

Backend einrichten:

1. MySQL downloaden installieren

2. in shell virtualenv einrichten (\$ virtualenv venv und aktivieren -> je nach OS im venv ordner activate ausführen und venv zu starten)

3. in venv shell mit pip bibiotheken installieren ($ pip install pymysql und $pip install sqlalchemy)

4. in zeile 10 in generate_database.py (engine = create_engine('mysql+pymysql://root:password@127.0.0.1')) ist der login für den mysql server

5. es kann sein das beim ersten versuch die Zeile DROP SCHEMA test auskommentiert werden muss, falls es noch keine datenbank test gibt

6. ausführen mit: \$ python database_controller.py
