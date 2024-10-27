import * as reservationModel from '../models/reservationModel.js';

export const fetchAllReservations = () => {
    return reservationModel.getAllReservations();
}

export const fetchFirstReservationOfBook = (book_id) => {
    return reservationModel.getFirstReservationOfBook(book_id);
}

// export const fetchReservationById = async (id) => {
//     return await reservationModel.getReservationById(id);
// }

export const createNewReservation = async (reservationData) => {
    // Aquí podrías agregar validaciones antes de crear el libro
    return await reservationModel.createReservation(reservationData);
}

export const updateExistingReservation = async (id, reservationData) => {
    return await reservationModel.updateReservation(id, reservationData);
}

export const removeReservation = async (id) => {
    return await reservationModel.deleteReservation(id);
}