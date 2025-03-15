import axios from "axios"

const deleteURL = "http://localhost:8085/booklib/api/v1/books"

export const DeleteBook = async(bookId: string) => {
    //update the book
    try {
        const response = await axios.delete(
            `${deleteURL}?bookIdKey=${bookId}`
        );
        return response.data
    } catch (error) {
        console.error("Failed to Delete book", error)
        throw error   
    }
}