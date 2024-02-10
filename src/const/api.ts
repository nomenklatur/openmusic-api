export enum RESPONSE_CODE {
    OK = 200,
    CREATED = 201,
    NOT_FOUND = 404,
    BAD_REQUEST = 400,
    UNAUTHENTICATED = 401,
    UNAUTHORIZED = 403,
    INTERNAL_ERROR = 500,
    UNDER_MAINTENANCE = 503
};

export enum RESPONSE_STATUS {
    SUCCESS = 'success',
    FAILED = 'fail',
    ERROR = 'error'
};