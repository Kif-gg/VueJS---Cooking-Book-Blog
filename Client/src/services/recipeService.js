import * as request from "../util/requester";

const baseUrl = "http://localhost:3030";

export const getHomeRecipes = async () => {
    return request.get(baseUrl);
};

export const getAllRecipes = async () => {
    return request.get(`${baseUrl}/recipes`);
};

export const getRecipesFiltered = async (formData) => {
    const querySearch = new URLSearchParams(formData).toString();
    return request.get(`${baseUrl}/recipes?${querySearch}`);
};

export const getRecipeById = async (recipeId) => {
    return request.get(`${baseUrl}/recipes/${recipeId}`);
};

export const postReview = async (recipeId, formData) => {
    return request.post(`${baseUrl}/recipes/${recipeId}`, formData);
};

export const editReview = async (recipeId, reviewId, formData) => {
    return request.put(`${baseUrl}/recipes/${recipeId}/${reviewId}`, formData);
};

export const deleteReview = async (recipeId, reviewId) => {
    return request.del(`${baseUrl}/recipes/${recipeId}/${reviewId}`);
};

export const addRecipeToFavorites = async (recipeId) => {
    return request.post(`${baseUrl}/recipes/${recipeId}/favorite`);
};

export const removeRecipeFromFavorites = async (recipeId) => {
    return request.del(`${baseUrl}/recipes/${recipeId}/favorite`);
};