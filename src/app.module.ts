import { Module } from '@nestjs/common';
import { NeogqlResolver } from './neogql/neogql.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
    }),
  ],
  providers: [NeogqlResolver],
})
export class AppModule {}
