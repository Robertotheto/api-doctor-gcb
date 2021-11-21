import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { SchemaOf } from 'yup';
import { YupValidationError } from '../utils/yupValidationError';

@Injectable()
export class YupValidationPipe implements PipeTransform {
  constructor(private readonly schema: SchemaOf<{}>) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      await this.schema.validate(value, { abortEarly: false });
    } catch (error) {
      throw new BadRequestException(
        YupValidationError(error),
        'You entered a field missing information',
      );
    }
    return value;
  }
}
