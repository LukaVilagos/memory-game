import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { map } from 'rxjs';

@Injectable()
export class TransformInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        return instanceToPlain(data);
      }),
    );
  }
}
