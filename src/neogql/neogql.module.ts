import { Module } from '@nestjs/common';
import { NeogqlResolver } from './neogql.resolver';

@Module({
  providers: [NeogqlResolver],
})
export class NeogqlModule {}
