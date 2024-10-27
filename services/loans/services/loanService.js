import * as loanModel from "../models/loanModel.js";
import axios from "axios";

export const fetchAllLoans = () => {
  return loanModel.getAllLoans();
};

export const fetchLoanById = (id) => {
  return loanModel.getLoanById(id);
};

export const fetchLoansByUserId = (id) => {
  return loanModel.getLoansByUserId(id);
}

export const createNewLoan = async (loanData) => {
  const book_id = loanData.book_id;

  //Verificar si tiene multas mayores a $20.0
  const {data} = await axios.get(`http://localhost:3005/fines/user/${loanData.user_id}/summary`);
    if(data.sum_fines > 20.0){
        return { 
          message: "Tienes multas mayores a $20.0, no puedes solicitar préstamos." 
      };
    }

  // Verificar disponibilidad del libro llamando al servicio Books
  const bookResponse = await axios.get(
    `http://localhost:3001/books/${book_id}/availability`
  );
  const availableCopies = bookResponse.data.available_copies;

  if (availableCopies < 1) {
    // No hay copias disponibles, redirige al flujo de reservas
    const reservationResponse = await axios.post(
      `http://localhost:3003/reservations`,
      {
        user_id: loanData.user_id,
        book_id: book_id,
      }
    );

    return {
      message:
        "No hay copias disponibles para el préstamo, se ha creado una reserva.",
      reservation: reservationResponse.data,
    };
  }

  // Actualizar la disponibilidad del libro en el servicio Books
  await axios.put(`http://localhost:3001/books/${book_id}`, {
    available_copies: availableCopies - 1,
  });

  return await loanModel.createLoan(loanData);
};

export const returnLoan = async (loanId) => {
  // Obtener el préstamo por ID
  const loan = await loanModel.getLoanById(loanId);

  if (!loan) {
    throw new Error("Préstamo no encontrado.");
  }

  // Verificar si el préstamo ya ha sido devuelto
  if (loan.status === "returned") {
    return { message: "Este préstamo ya ha sido devuelto anteriormente." };
  }

  const book_id = loan.book_id;

  // Obtener la disponibilidad actual del libro
  const bookResponse = await axios.get(`http://localhost:3001/books/${book_id}/availability`);
  const availableCopies = bookResponse.data.available_copies;

  // Incrementar las copias disponibles
  await axios.put(`http://localhost:3001/books/${book_id}`, {
    available_copies: availableCopies + 1,
  });

  // Actualizar el préstamo a estado devuelto
  await loanModel.updateLoan(loanId, {
    status: "returned",
    return_date: formatDate(new Date()),
  });

  // Calcular la cantidad de días de retraso y aplicar una multa de $5 por día
  const returnDate = new Date(loan.return_date);
  const currentDate = new Date();
  const differenceMs = currentDate - returnDate;
  const delayDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

  let fine = 0;

  // Calcular multa según días de retraso
  if (delayDays > 0) {
    if (delayDays > 10) {
      fine = 50.0; // Multa máxima de $50 para más de 10 días de retraso
    } else {
      fine = delayDays * 5; // $5 por día hasta 10 días de retraso
    }

    // Crear multa
    await axios.post("http://localhost:3005/fines/", {
      loan_id: loanId,
      user_id: loan.user_id,
      fine_amount: fine,
      amount_due: fine
    });
  }

  // Verificar si existen reservas para este libro
  const reservationResponse = await axios.get(`http://localhost:3003/reservations/${book_id}`);
  const reservation = reservationResponse.data;

  if (reservation) {
    // Notificar al usuario de la primera reserva
    console.log(`Notificación enviada a usuario ID: ${reservation.user_id} sobre la disponibilidad del libro.`);
    await axios.put(`http://localhost:3003/reservations/${reservation.id}`, { status: 'notified' });
  }

  // Mensaje de retorno basado en si hubo o no multa
  if (fine > 0) {
    return {
      message: `Préstamo devuelto exitosamente con una multa de $${fine} por ${delayDays} días de retraso.`,
      fineAmount: fine,
      delayDays: delayDays
    };
  } else {
    return {
      message: "Préstamo devuelto exitosamente. No se generó ninguna multa.",
      delayDays: 0
    };
  }
};


export const updateExistingLoan = async (id, loanData) => {
  return await loanModel.updateLoan(id, loanData);
};

const formatDate = (date) => {
  const offset = date.getTimezoneOffset();
  const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
  return adjustedDate.toISOString().slice(0, 19).replace("T", " ");
};