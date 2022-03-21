
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class Actor {
    id: string;
    name: string;
    movie?: Movie[];
}

export class Movie {
    id: string;
    title: string;
    actors?: Actor[];
}

export abstract class IQuery {
    abstract getMovies(): Movie[] | Promise<Movie[]>;

    abstract movie(id: string): Movie | Promise<Movie>;

    abstract getActor(): Actor[] | Promise<Actor[]>;

    abstract actor(id: string): Actor | Promise<Actor>;
}
