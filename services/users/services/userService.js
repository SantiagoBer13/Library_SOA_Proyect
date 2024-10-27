import * as userModel from '../models/userModel.js';
import axios from "axios"

export const fetchAllUsers = () => {
    return userModel.getAllUsers();
}

export const fetchUserById = async (id) => {
    const user = await userModel.getUserById(id)
    if(!user){
        return null;
    }
    const {data} = await axios.get(`http://localhost:3005/fines/user/${id}/summary`);
    if(data.sum_fines > 0.0){
        return {
            ...user,
            fines: data,
        }
    }
    return user;
}

export const createNewUser = async (userData) => {
    return await userModel.createUser(userData);
}

export const updateExistingUser = async (id, userData) => {
    return await userModel.updateUser(id, userData);
}

export const removeUser = async (id) => {
    return await userModel.deleteUser(id);
}