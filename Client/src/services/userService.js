import * as request from "../util/requester";

const baseUrl = "http://localhost:3030/users";

export const register = async (formData) => {
    return request.post(`${baseUrl}/register`, formData);
};

export const login = async (formData) => {
    return request.post(`${baseUrl}/login`, formData);
};

export const logout = async () => {
    return request.get(`${baseUrl}/logout`);
};

export const getProfile = async () => {
    return request.get(`${baseUrl}/profile`);
};

export const getFavorites = async () => {
    return request.get(`${baseUrl}/profile/favorites`);
};

export const getReviews = async () => {
    return request.get(`${baseUrl}/profile/reviews`);
};

export const editProfile = async (formData) => {
    return request.put(`${baseUrl}/profile`, formData);
};

export const deleteProfile = async (formData) => {
    return request.del(`${baseUrl}/profile`, formData);
};