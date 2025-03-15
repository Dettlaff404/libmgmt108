import axios from "axios"

const addURL = "http://localhost:8085/booklib/api/v1/books"

export const AddBookData = async(book: any) => {
    //update the book
    try {
        const response = await axios.post(
            addURL,
            book
        );
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error("Failed to Update book", error)
        throw error   
    }
}