import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RateLimiterGuard extends ThrottlerGuard {
  // protected getTracker(req: Record<string, any>): string {
  //     console.log('req: ', req)
  //     return req.ips.length ? req.ips[0] : req.ip; // individualize IP extraction to meet your own needs
  // }
}
