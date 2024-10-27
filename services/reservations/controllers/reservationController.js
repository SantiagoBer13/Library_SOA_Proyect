import * as reservationService from '../services/reservationService.js';

// Obtener todas los reservaciones
export const getAllReservations = async (req, res) => {
    try {
        const [reservations] = await reservationService.fetchAllReservations();
        return res.json(reservations);
    } catch (error) {
        console.error("Error fetching all reservations:", error);
        return res.status(500).json({ message: "There was a problem retrieving the reservations." });
    }
}

export const getFirstReservationOfBook = async (req, res) => {
    try {
        const book_id = req.params.id;
        const [reservation] = await reservationService.fetchFirstReservationOfBook(book_id)

        if (!reservation) {
            return res.status(404).json({message: "This book doesn't reservations."})
        }

        return res.json(reservation);

    } catch (error) {
        console.error("Error fetching reservations of Book:", error);
        return res.status(500).json({ message: "There was a problem retrieving the reservation." });
    }
}

// export const getReservationById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const reservation = await reservationService.fetchReservationById(id);

//         if (!reservation) {
//             return res.status(404).json({ message: "Reservation not found." });
//         }

//         return res.json(reservation);
//     } catch (error) {
//         console.error("Error fetching reservation by ID:", error);
//         return res.status(500).json({ message: "There was a problem retrieving the reservation." });
//     }
// }

// Crear un nuevo usuario
export const createReservation = async (req, res) => {
    try {
        const reservationId = await reservationService.createNewReservation(req.body);
        return res.status(201).json({ id: reservationId, ...req.body });
    } catch (error) {
        console.error("Error creating reservation:", error);
        return res.status(500).json({ message: "There was a problem creating the reservation." });
    }
}

// Actualizar una resrvaciòn
export const updateReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await reservationService.updateExistingReservation(id, req.body);

       if (affectedRows === 0) {
            return res.status(404).json({ message: "Reservation not found." });
        }

        return res.json({ message: "Reservation updated successfully." });
    } catch (error) {
        console.error("Error updating reservation:", error);
        return res.status(500).json({ message: "There was a problem updating the reservation." });
    }
}

// Eliminar un usuario
export const deleteReservation = async (req, res) => {
    try {
        const id = req.params.id;
        const affectedRows = await reservationService.removeReservation(id);

        if (affectedRows === 0) {
            return res.status(404).json({ message: "Reservation not found." });
        }

        return res.sendStatus(204);
    } catch (error) {
        console.error("Error deleting reservation:", error);
        return res.status(500).json({ message: "There was a problem deleting the reservation." });
    }
}
