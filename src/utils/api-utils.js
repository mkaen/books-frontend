
export const bookActivation = (data, bookId, bookList) => {
    for (const book of bookList) {
        if (book.id === bookId) {
            book.isActive = data;
            return true;
        }
    }
    return false;
};

export const reserveBookHandler = (data, bookList) => {
    for (const book of bookList) {
        if (book.id === data.id) {
            book.reserved = true;
            book.lenderId = data.lenderId;
            return true;
        }
    }
    return false;
};

export const cancelReservationHelper = (bookId, bookList) => {
    for (const book of bookList) {
        if (book.id === bookId) {
            book.reserved = false;
            book.lenderId = null;
            return true;
        }
    }
    return false;
};

export const receiveBookHelper = (date, bookId, bookList) => {
    const [day, month, year] = date.split("-");
    const returnDate = new Date(year, month - 1, day);
    for (const book of bookList) {
        if (book.id === bookId) {
            book.lentOut = true;
            book.returnDate = returnDate;
        }
    }
};