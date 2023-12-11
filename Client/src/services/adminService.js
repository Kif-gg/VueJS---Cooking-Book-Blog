import * as request from "../util/requester";

const baseUrl = "http://localhost:3030/secret-path/admin";

export const adminLogin = async (formData) => {
    return request.post(`${baseUrl}/login`, formData);
};

export const adminLogout = async () => {
    return request.get(`${baseUrl}/logout`);
};

export const getDashboard = async () => {
    return request.get(`${baseUrl}/dashboard`);
};

export const createRecipe = async (formData) => {
    return request.post(`${baseUrl}/recipes`, formData);
};

export const editRecipe = async (recipeId, formData) => {
    return request.put(`${baseUrl}/recipes/${recipeId}`, formData);
};

export const deleteRecipe = async (recipeId) => {
    return request.del(`${baseUrl}/recipes/${recipeId}`);
};

export const getAllUsers = async () => {
    return request.get(`${baseUrl}/users`);
};

export const getUsersFiltered = async (formData) => {
    const querySearch = new URLSearchParams(formData).toString();
    return request.get(`${baseUrl}/users?${querySearch}`);
};

export const editUser = async (userId, formData) => {
    return request.put(`${baseUrl}/users/${userId}`, formData);
};

export const deleteUser = async (userId) => {
    return request.del(`${baseUrl}/users/${userId}`);
};