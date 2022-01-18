from contextlib import contextmanager
from psycopg2.extras import RealDictCursor
from psycopg2.pool import SimpleConnectionPool


db = SimpleConnectionPool(1, 10,
                          host='localhost',
                          database='postgres',
                          user='postgres',
                          password='postgres',
                          port=5432)


@contextmanager
def get_connection():
    con = db.getconn()
    try:
        yield con
    finally:
        db.putconn(con)


def execute_insert_command(command, params=None):
    with get_connection() as conn:
        try:
            rid = None
            cursor = conn.cursor()
            print(cursor.mogrify(command, params))  
            cursor.execute(command, params)
            if "returning" in command.lower():
                rid = cursor.fetchone()
            cursor.close()
            conn.commit()
            return rid
        except Exception as ex:
            print(ex)
            conn.rollback()
            cursor.close()

def execute_select_command(command, params=None):
    with get_connection() as conn:
        try:
            cursor = conn.cursor(cursor_factory = RealDictCursor)
            print(cursor.mogrify(command, params))  
            cursor.execute(command, params)
            result = cursor.fetchall()
            cursor.close()
            conn.commit()
            return result
        except Exception as ex:
            print(ex)
            conn.rollback()
            cursor.close()

# def get_connection():
#     conn = connect(user='postgres', password='postgres', host='localhost', dbname='postgres')
#     return conn