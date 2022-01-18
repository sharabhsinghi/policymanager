

def authorize(func):
    def response_generator(*args, **kwargs):
        result = func(*args, **kwargs)
        return result
    return response_generator