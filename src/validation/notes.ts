import Joi from 'joi';
import { type NotePayload } from 'src/types/note';
import { ValidationException } from '../const/http_exception';

const validationSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required()
});

class NotesValidation {
  validate (payload: NotePayload) {
    const validationResult = validationSchema.validate(payload);

    if (validationResult.error) {
      throw new ValidationException(validationResult.error.message);
    }
  }
}

export default NotesValidation;
