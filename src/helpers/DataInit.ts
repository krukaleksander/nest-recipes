import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class DataInitService implements OnApplicationBootstrap {
  onApplicationBootstrap() {
    console.log('app is starting');
  }
}
