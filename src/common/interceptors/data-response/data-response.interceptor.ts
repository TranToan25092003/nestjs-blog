import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class DataResponseInterceptor implements NestInterceptor {
  constructor(
    /**
     * inject app config service
     */
    private readonly configService: ConfigService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //console.log('before interceptor'); // before request

    return next.handle().pipe(
      map((data) => ({
        apiVersion: this.configService.get('appConfig.apiVersion'),
        data: data,
      })),
    ); // after request
  }
}

/**
 *  create an interceptor nest g itc path --no-spec
 *
 *  in intercept method code before line next.handle() is before request and code in line next.handle() is after request
 *
 *  add global interceptor in app.module
 *
 *
 */
