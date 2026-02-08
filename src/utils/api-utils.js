import { useUserStore } from "@/store";

export const bookActivation = (activeValue, bookId, bookStore) => {
    const book = bookStore.myBookList.find(b => b.id === bookId);
    book.isActive = activeValue;

    return !!book;
};

export const reserveBookHandler = (lenderId, bookStore) => {
    const book = bookStore.bookList.find(b => b.id === lenderId);
    const userStore = useUserStore()
    book.reserved = true;
    book.lenderId = userStore.userId;

    return !!book;
};

export const cancelReservationHelper = (bookId, bookStore) => {
    const book = bookStore.myReservedBooks.find(b => b.id === bookId);
    book.reserved = false;
    book.lenderId = null;
    bookStore.myReservedBooks = bookStore.reservedBooks.filter(book => book.id !== bookId);

    return !!book;

};

export const receiveBookHelper = (date, bookId, bookStore) => {
    const [day, month, year] = date.split("-");
    const returnDate = new Date(year, month - 1, day);
    const book = bookStore.myReservedBooks.find(b => b.id === bookId);
    book.lentOut = true;
    book.returnDate = returnDate;

    return !!book;
};

export const returnBookHandler = (bookId, bookStore) => {
    const book = bookStore.myReservedBooks.find(b => b.id === bookId);
    book.lentOut = false;
    book.reserved = false;
    book.lenderId = null;
    bookStore.myReservedBooks = bookStore.reservedBooks.filter(book => book.id !== bookId);

    return !! book;
}