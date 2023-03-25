import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(private readonly config: ConfigService){}

  getHello(): string {
    return `Hello Nestjs World!  ${this.config.get<string>('CURRENT_ENV')}`;
  }
}
