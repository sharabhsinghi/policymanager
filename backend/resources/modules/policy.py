from flask import Blueprint, request
from resources.utils import connection, utilities
from resources.utils.authorizer import authorize
import json


POLICY = Blueprint("policy", __name__)

@POLICY.route('/policy', methods=['GET'])
@authorize
def get_all_policies(*args, **kwargs):
    user_id = kwargs['user_id']
    query = """ select * from policy natural join user_policy
     where user_policy.user_id=%(user_id)s
    """
    result = connection.execute_select_command(query, {"user_id": user_id})
    response = []
    for row in result:
        response.append({
            "company": row.get('company', ''),
            "policy_number": row.get('policy_number', ''), 
            "policy_holder": row.get('policy_holder', ''),
            "insured": row.get('insured', ''), 
            "premium_amount": row.get('premium_amount', ''),
            "start_date": row.get('start_date', ''), 
            "premium_end_date": row.get('premium_end_date', ''), 
            "date_of_maturity": row.get('date_of_maturity', ''), 
            "covered_amount": row.get('covered_amount', '')
        })
    return json.dumps(response, default=utilities.datetime_handler)


@POLICY.route('/policy', methods=['POST'])
@authorize
def add_policy(*args, **kwargs):
    user_id = kwargs['user_id']
    data = json.loads(request.data)
    
    company = data.get('company', '') 
    policy_number = data.get('policy_number', '') 
    policy_holder = data.get('policy_holder', '') 
    insured = data.get('insured', '') 
    premium_amount = data.get('premium_amount', '')
    start_date = data.get('start_date', '') 
    premium_end_date = data.get('premium_end_date', '') 
    date_of_maturity = data.get('date_of_maturity', '') 
    covered_amount = data.get('covered_amount', '')

    insert_statement = """INSERT INTO policy 
    ("company", "policy_number", "policy_holder", "insured", "premium_amount",
    "start_date", "premium_end_date", "date_of_maturity", "covered_amount") 
    values %(values)s RETURNING "policy_number" """
    values = (company, policy_number, policy_holder, insured, premium_amount, 
        start_date, premium_end_date, date_of_maturity, covered_amount,)
    result = connection.execute_insert_command(insert_statement, {"values": values})

    insert_mapping_statement = """INSERT into user_policy values %(values)s"""
    mapping_values = (user_id, result[0])
    result = connection.execute_insert_command(insert_mapping_statement, {"values": mapping_values})

    return json.dumps(result)


    