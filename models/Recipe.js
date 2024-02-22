import mongoose from "mongoose";

const RecipeSchema = mongoose.Schema({
    name: String,
    description: String,
    createAt: String,
    thumbsUp: Number,
    thumbsDown: Number

})

const Recipe = mongoose.model("Recipe", RecipeSchema)

export default Recipe