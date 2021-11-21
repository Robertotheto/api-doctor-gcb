import { ValidationError } from 'yup';
import { YupError } from '../interfaces/interface.yup.error';

export const YupValidationError = (error: ValidationError) => {
  const invalid: YupError[] = [];

  error.inner.map((value) => {
    invalid.push({
      path: value.path,
      message: value.message,
    });
  });
  return invalid;
};
