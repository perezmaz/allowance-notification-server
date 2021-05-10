import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jwt-simple';
import * as moment from 'moment';
import { jwtToken } from '../config';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      if (!req.headers.authorization) {
        return false;
      }

      const token = req.headers.authorization.replace(/['"]+/g, '');
      const payload = jwt.decode(token, jwtToken.SECRET_KEY, true);

      if (payload.expired_at <= moment().unix()) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
