

class Policy:
    def __init__(company=None, policy_number=None, policy_holder=None, insured=None, 
                 premium_amount=None, start_date=None, premium_end_date=None, 
                 date_of_maturity=None, covered_amount=None, is_deleted=None, created_by=None):
        self.company = company
        self.policy_number = policy_number
        self.policy_holder = policy_holder
        self.insured = insured
        self.premium_amount = premium_amount
        self.start_date = start_date
        self.premium_end_date = premium_end_date
        self.date_of_maturity = date_of_maturity
        self.covered_amount = covered_amount
        self.is_deleted = is_deleted
        self.created_by = created_by

        self.table_name = "policy"

    def to_json():
        return self.__dict__

    # def get_columns_for_insert(self):
    #     dict = self.__dict__.copy()
    #     del dict[DbBookmark.Columns.Id]
    #     return dict

    @staticmethod
    def to_object(json_data, with_table=False):
        prefix = ""
        if with_table:
            prefix = self.table_name + "."

        if json_data is not None:
            try:
                return Policy(
                    company=json_data.get(prefix + 'company'),
                    policy_number=json_data.get(prefix + 'policy_number'),
                    policy_holder=json_data.get(prefix + 'policy_holder'),
                    insured=json_data.get(prefix + 'insured'),
                    premium_amount=json_data.get(prefix + 'premium_amount'),
                    start_date=json_data.get(prefix + 'start_date'),
                    premium_end_date=json_data.get(prefix + 'premium_end_date'),
                    date_of_maturity=json_data.get(prefix + 'date_of_maturity'),
                    covered_amount=json_data.get(prefix + 'covered_amount'),
                    is_deleted=json_data.get(prefix + 'is_deleted'),
                    created_by=json_data.get(prefix + 'created_by')
                )
            except Exception as exception:
                raise Exception("Error creating model: {}".format(exception.args[0]))