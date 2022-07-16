import { RequestHandler } from "express";
import { movies } from "../data/movies-data";
import HttpError from "../models/HttpError";

import Movies from "../schema/movies";

export const postMovies: RequestHandler = async (req, res, next) => {
  try {
    const moviesDocuments = movies.map(
      (movie) => new Movies({ title: movie.title, year: movie.year })
    );

    const result = await Movies.insertMany(moviesDocuments);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getMovies: RequestHandler = async (req, res, next) => {
  try {
    const query = <{ search: string }>req.query;

    const movies = await Movies.find().exec();

    if (!req.query.search) {
      res.status(200).json(movies);
      return;
    }

    res
      .status(200)
      .json(
        movies.filter(
          (movie) =>
            req.query.search &&
            movie.title.toLowerCase().includes(query.search.toLowerCase())
        )
      );
  } catch (error) {
    next(error);
  }
};
