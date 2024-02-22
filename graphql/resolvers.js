import Recipe from "../models/Recipe.js"


export const resolvers = {
    Query:{
        async recipe(_, {ID}){
            return await Recipe.findById(ID)
        },
        async getRecipes(_, {amount}){
            return await Recipe.find().sort({createAt: -1}).limit(amount)

        }

    },
    Mutation:{
        async createRecipe(_,{recipeInput:{name, description}}){
            const createRecipe = new Recipe({
                name, 
                description,
                createAt: new Date().toISOString(),
                thumbsUp: 0, 
                thumbsDown: 0
            })
            const res = await createRecipe.save()
            return {
                id: res.id,
                ...res._doc
            }
        },

        async deleteRecipe(_,{ID}){
            const wasDeleted = (await Recipe.deleteOne({_id: ID})).deletedCount
            return wasDeleted //1 is something was deleted, 0 is nothing was deleted
        },

        async editRecipe(_, {ID, recipeInput:{name, description}}){
            const update = {name, description}
            const wasModified = (await Recipe.findOneAndUpdate({_id:ID}, update)).modifiedCount
            return wasModified

        }

    }
};

