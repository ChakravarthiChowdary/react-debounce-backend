import { Schema, Model, Document, model, Types } from "mongoose";
import uniqueValidatorPkg from "mongoose-unique-validator";

interface IMovies extends Document {
  title: string;
  year: string;
}

const uniqueValidator: any = uniqueValidatorPkg;

const MoviesSchema: Schema<IMovies> = new Schema({
  title: { type: String, required: true },
  year: { type: String, required: true, maxLength: 4 },
});

MoviesSchema.plugin(uniqueValidator);

MoviesSchema.index({ title: "text" });

MoviesSchema.set("toObject", {
  getters: true,
});

const MoviesModel: Model<IMovies> = model("Movies", MoviesSchema);

export default MoviesModel;
