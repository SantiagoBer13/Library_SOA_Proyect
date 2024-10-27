import * as fineModel from "../models/fineModel.js";

export const fetchAllFines = () => {
  return fineModel.getAllFines();
};

export const fetchFineById = (id) => {
  return fineModel.getFineById(id);
};

export const fetchFinesByUserId = (id) => {
  return fineModel.getFinesByUserId(id);
}

export const fetchFinesPendientsByUserId = (id) => {
  return fineModel.getFinesPendientsByUserId(id);
}

export const createNewFine = async (fineData) => {
  return await fineModel.createFine(fineData);
};

export const payFine = async (fineId, fineData) => {
  // Obtener la multa por ID
  const fine = await fineModel.getFineById(fineId);
  if (!fine) {
    throw new Error("Multa no encontrada.");
  }

  // Verificar si la multa ya ha sido pagada
  if (fine.status === "paid") {
    return { message: "Esta multa ya ha sido pagada." };
  }

  const { amount, amount_due } = fine;
  const { pay } = fineData;
  
  // Calcular el nuevo monto pendiente después del pago
  const newAmountDue = amount_due - pay;

  if (newAmountDue <= 0) {
    // Si el pago cubre o excede la cantidad adeudada
    await fineModel.payFine(fineId, 0, 'paid');
    return { message: "La multa ha sido pagada en su totalidad." };
  } else {
    // Pago parcial
    await fineModel.payFine(fineId, newAmountDue, 'pending');
    return { 
      message: `Se ha pagado una parte de la multa. Multa total: ${amount}, pagado: ${pay}, restante: ${newAmountDue}.`
    };
  }
};


export const updateExistingLoan = async (id, loanData) => {
  return await loanModel.updateLoan(id, loanData);
};