import axios from "axios"

const getBooksURL = "http://localhost:8085/booklib/api/v1/books/getallbooks"

export const GetBooks = async() => {
    //get the books
    try {
        const response = await axios.get(getBooksURL)
        return response.data
    } catch (error) {
        console.error("Failed to get books", error)
        throw error   
    }
}