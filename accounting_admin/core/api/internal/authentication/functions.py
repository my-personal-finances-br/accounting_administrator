class UserEnvironment:
    def __init__(self, request):
        self.request = request

    @property
    def is_backoffice_user(self):
        try:
            return (not not self.request.user.id) if self.request.user.is_staff else False
        except Exception:
            return False
