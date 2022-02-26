import json
from flask import Blueprint, request
from resources.utils import connection, utilities
from resources.utils.authorizer import authorize


PAYMENT = Blueprint("payment", __name__)

@PAYMENT.route('/payment', methods=['POST'])
@authorize
def add_policy_payment(*args, **kwargs):
    data = json.loads(request.data)
    policy_number = data.get('policy_number', '') 
    payment_date = data.get('payment_date', '') 
    payment_amount = data.get('payment_amount', '') 
    notes = data.get('notes', '') 

    insert_statement = """INSERT INTO policy_payment 
    ("policy_number", "payment_date", "notes", "payment_amount") 
    values %(values)s """
    values = (policy_number, payment_date, notes, payment_amount)
    result = connection.execute_insert_command(insert_statement, {"values": values})

    return json.dumps(result)


@PAYMENT.route('/payment', methods=['GET'])
@authorize
def get_policy_payments(*args, **kwargs):
    user_id = kwargs['user_id']
    data = request.args
    policy_number = data.get('policy_number', '') 

    query = """ select * from policy_payment 
     natural join user_policy
     where user_id=%(user_id)s 
     and policy_number=%(policy_number)s
    """
    result = connection.execute_select_command(query, 
                                               {"user_id": user_id,
                                                "policy_number": policy_number})
    response = []
    for row in result:
        response.append({
            "policy_number": row.get('policy_number', ''), 
            "payment_date": row.get('payment_date', ''), 
            "payment_amount": row.get('payment_amount', ''), 
            "notes": row.get('notes', '')
        })
    return json.dumps(response, default=utilities.datetime_handler)
