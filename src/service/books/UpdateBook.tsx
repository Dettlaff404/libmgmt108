import axios from "axios"

const updateURL = "http://localhost:8085/booklib/api/v1/books"

export const UpdateBook = async(book: any) => {
    //update the book
    try {
        const response = await axios.patch(
            `${updateURL}?bookId=${book.bookId}`,
            book
        );
        return response.data
    } catch (error) {
        console.error("Failed to Update book", error)
        throw error   
    }
}