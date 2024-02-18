import { type ResponseToolkit, type ResponseObject } from '@hapi/hapi';
import { HTTPException } from '../const/http_exception';
import { RESPONSE_CODE, RESPONSE_STATUS } from '../const/api';

export function handleHTTPError (error: Error, responseInstance: ResponseToolkit): ResponseObject {
  if (error instanceof HTTPException) {
    const response: ResponseObject = responseInstance.response({
      status: RESPONSE_STATUS.FAILED,
      message: error.message
    });
    response.code(error.statusCode as number);
    return response;
  }

  const response: ResponseObject = responseInstance.response({
    status: RESPONSE_STATUS.ERROR,
    message: 'Something Went Wrong! Please try again'
  });
  response.code(RESPONSE_CODE.INTERNAL_ERROR);
  return response;
}
