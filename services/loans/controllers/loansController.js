import * as loanService from '../services/loanService.js';

// Obtener todos los loans
export const getAllLoans = async (req, res) => {
    try {
        const [loans] = await loanService.fetchAllLoans();
        return res.json(loans);
    } catch (error) {
        console.error("Error fetching all loans:", error);
        return res.status(500).json({ message: "There was a problem retrieving the loans." });
    }
}

// Obtener un loan por ID
export const getLoanById = async (req, res) => {
    try {
        const id = req.params.id;
        const [loan] = await loanService.fetchLoanById(id);

        if (!loan) {
            return res.status(404).json({ message: "Loan not found." });
        }

        return res.json(loan);
    } catch (error) {
        console.error("Error fetching loan by ID:", error);
        return res.status(500).json({ message: "There was a problem retrieving the loan." });
    }
}

export const getLoansByUserId = async (req, res) => {
    try {
        const id = req.params.user_id;
        const [loans] = await loanService.fetchLoansByUserId(id);
        return res.json(loans);
    } catch (error) {
        console.error("Error fetching all loans:", error);
        return res.status(500).json({ message: "There was a problem retrieving the loans." }); 
    }
}

// Crear un nuevo loan
export const createLoan = async (req, res) => {
    try {
        const loanResult = await loanService.createNewLoan(req.body);

        // Verificar si se recibió un mensaje indicando multas pendientes
        if (loanResult.message === "Tienes multas mayores a $20.0, no puedes solicitar préstamos.") {
            return res.status(403).json({ message: loanResult.message });
        }

        // Si hay reserva en lugar de préstamo
        if (loanResult.message === "No hay copias disponibles para el préstamo, se ha creado una reserva.") {
            return res.status(200).json({
                message: loanResult.message,
                reservation: loanResult.reservation,
            });
        }

        // Éxito en la creación del préstamo
        return res.status(201).json({ 
            message: "Préstamo creado con éxito.",
            id: loanResult.loan.id,
            ...req.body 
        });

    } catch (error) {
        console.error("Error creating loan:", error);
        
        if (error.message === 'No hay copias disponibles para el préstamo.') {
            return res.status(400).json({ message: error.message });
        }

        return res.status(500).json({ message: "Hubo un problema al crear el préstamo." });
    }
};


export const returnLoan = async (req, res) => {
    try {
        const loanId = req.params.id;
        const result = await loanService.returnLoan(loanId);

        // Verificar si el préstamo no fue encontrado
        if (result.message === 'Préstamo no encontrado.') {
            return res.status(404).json({ message: result.message });
        }

        // Verificar si se generó una notificación de reserva
        if (result.reservation) {
            return res.json({
                message: result.message,
                reservation: result.reservation,
                notification: `Se notificó al usuario con ID: ${result.reservation.user_id} sobre la disponibilidad del libro.`,
            });
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

// Actualizar un loan
export const updateLoan = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await loanService.updateExistingLoan(id, req.body);

        if (affectedRows === 0) {
            return res.status(404).json({ message: "Loan not found." });
        }

        return res.json({ message: "Loan updated successfully." });
    } catch (error) {
        console.error("Error updating loan:", error);
        return res.status(500).json({ message: "There was a problem updating the loan." });
    }
}