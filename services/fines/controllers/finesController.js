import * as fineService from '../services/fineService.js';

// Obtener todos los fines
export const getAllFines = async (req, res) => {
    try {
        const [fines] = await fineService.fetchAllFines();
        return res.json(fines);
    } catch (error) {
        console.error("Error fetching all fines:", error);
        return res.status(500).json({ message: "There was a problem retrieving the fines." });
    }
}

// Obtener un fine por ID
export const getFineById = async (req, res) => {
    try {
        const id = req.params.id;
        const [fine] = await fineService.fetchFineById(id);

        if (!fine) {
            return res.status(404).json({ message: "Fine not found." });
        }

        return res.json(fine);
    } catch (error) {
        console.error("Error fetching fine by ID:", error);
        return res.status(500).json({ message: "There was a problem retrieving the fine." });
    }
}

export const getFinesByUserId = async (req, res) => {
    try {
        const id = req.params.user_id;
        const [fines] = await fineService.fetchFinesByUserId(id);
        if(!fines){
            return res.send("Este usuario no tiene multas.")
        }
        return res.json(fines);
    } catch (error) {
        console.error("Error fetching all fines:", error);
        return res.status(500).json({ message: "There was a problem retrieving the fines." }); 
    }
}

export const getFinesPendientsByUserId = async (req, res) => {
    try {
        const id = req.params.user_id;
        const [fines] = await fineService.fetchFinesPendientsByUserId(id);
        return res.json(fines);
    } catch (error) {
        console.error("Error fetching all fines:", error);
        return res.status(500).json({ message: "There was a problem retrieving the fines." }); 
    }
}

export const createFine = async (req, res) => {
    try {
        const fineId = await fineService.createNewFine(req.body);
        return res.status(201).json({ id: fineId, ...req.body });
    } catch (error) {
        console.error("Error creating fine:", error);
        return res.status(500).json({ message: "There was a problem creating the fine." });
    }
}

export const payFine = async (req, res) => {
    try {
        const fineId = req.params.id;
        const result = await fineService.payFine(fineId, req.body);

        // Verificar si el préstamo no fue encontrado
        if (result.message === '"Esta multa ya ha sido pagada.') {
            return res.status(404).json({ message: result.message });
        }

        // En caso de éxito en la devolución
        return res.json({ message: result.message });

    } catch (error) {
        if (error.message === 'Préstamo no encontrado.') {
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        return res.status(500).json({ message: "Hubo un problema al devolver el libro." });
    }
};