import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { HOSTNAME, NEO4J_USER, NEO4J_PASSWORD } from '../config';
import { Movie } from '../graphql';

import { Connection, relation, node } from 'cypher-query-builder';
import { NotFoundException } from '@nestjs/common';
const db = new Connection(`bolt://${HOSTNAME}`, {
  username: NEO4J_USER,
  password: NEO4J_PASSWORD,
});

@Resolver('Movie')
export class NeogqlResolver {
  @Query()
  async getMovies(): Promise<Movie> {
    const movies = (await db
      .matchNode('movies', 'Movie')
      .return([
        {
          movies: [{ id: 'id', title: 'title', year: 'year' }],
        },
      ])
      .run()) as any;

    return movies;
  }

  @Query('movie')
  async getMovieById(
    @Args('id')
    id: string,
  ): Promise<any> {
    const movie = (await db
      .matchNode('movie', 'Movie')
      .where({ 'movie.id': id })
      .return([
        {
          movie: [{ id: 'id', title: 'title', year: 'year' }],
        },
      ])
      .run<any>()) as any;

    if (movie.length === 0) {
      throw new NotFoundException(
        `Movie id '${id}' does not exist in database `,
      );
    }

    return movie[0];
  }

  @ResolveProperty()
  async actors(@Parent() movie: any) {
    const { id } = movie;

    return (await db
      .match([node('actors', 'Actor'), relation('in'), node('movie', 'Movie')])
      .where({ 'movie.id': id })
      .return([
        {
          actors: [
            {
              id: 'id',
              name: 'name',
              born: 'born',
            },
          ],
        },
      ])
      .run()) as any;
  }
}
