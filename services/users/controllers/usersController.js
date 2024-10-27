import * as userService from '../services/userService.js';

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const [users] = await userService.fetchAllUsers();
        return res.json(users);
    } catch (error) {
        console.error("Error fetching all users:", error);
        return res.status(500).json({ message: "There was a problem retrieving the users." });
    }
}

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userService.fetchUserById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.json(user);
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return res.status(500).json({ message: "There was a problem retrieving the user." });
    }
}

// Crear un nuevo usuario
export const createUser = async (req, res) => {
    try {
        const bookId = await userService.createNewUser(req.body);
        return res.status(201).json({ id: bookId, ...req.body });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "There was a problem creating the user." });
    }
}

// Actualizar un usuario
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await userService.updateExistingUser(id, req.body);

        if (affectedRows === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.json({ message: "User updated successfully." });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "There was a problem updating the book." });
    }
}

// Eliminar un usuario
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const affectedRows = await userService.removeUser(id);

        if (affectedRows === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.sendStatus(204);
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "There was a problem deleting the book." });
    }
}
