import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('AuthService') private readonly authService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // access_token
    const { authorization } = request.headers;

    return this.authService.getUserProfile(authorization).pipe(
      map(() => {
        return true;
      }),
      catchError(() => {
        return of(false);
      }),
    );
  }
}
