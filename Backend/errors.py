class PreConditionError(Exception):
    """ precondition failure - some provided values were incorrect / not present """
    
    def __init__(self, *args, **kwargs):
        super(PreConditionError, self).__init__(*args, **kwargs)

class TransitiveError(Exception):
    """  indirect / transitive error after partially done transactions -> database might have some inconsistencies (e.g. game inserted, but gameParticipants failed)  """
    
    def __init__(self, *args, **kwargs):
        super(TransitiveError, self).__init__(*args, **kwargs)