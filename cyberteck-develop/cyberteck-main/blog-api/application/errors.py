class AppException(Exception):
    def __init__(self, message, statusCode):
        self.statusCode = statusCode
        self.message = message


class InternalServerError(AppException):
    def __init__(self, message):
        super(InternalServerError, self).__init__(message, 500)


class SchemaValidationError(AppException):
    def __init__(self, message):
        super(SchemaValidationError, self).__init__(message, 400)


class AccessDeniedError(AppException):
    def __init__(self, message):
        super(AccessDeniedError, self).__init__(message, 403)

class DuplicateItemError(AppException):
    def __init__(self, message):
        super(DuplicateItemError, self).__init__(message, 304)


class ItemNotExistsError(AppException):
    def __init__(self, message):
        super(ItemNotExistsError, self).__init__(message, 404)


class UnauthorizedError(AppException):
    def __init__(self, message):
        super(UnauthorizedError, self).__init__(message, 401)