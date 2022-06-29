import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CheckIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      if (
        !req.params.id?.match(/^[0-9a-fA-F]{24}$/) &&
        req.params.id !== undefined
      ) {
        throw new HttpException('id is not valid', HttpStatus.FORBIDDEN);
      }
      if (
        !req.params.userid?.match(/^[0-9a-fA-F]{24}$/) &&
        req.params.userid !== undefined
      ) {
        throw new HttpException('id is not valid', HttpStatus.FORBIDDEN);
      }
      if (
        !req.params.bookid?.match(/^[0-9a-fA-F]{24}$/) &&
        req.params.bookid !== undefined
      ) {
        throw new HttpException('id is not valid', HttpStatus.FORBIDDEN);
      }
    } catch (err) {
      throw err;
    }
    next();
  }
}
