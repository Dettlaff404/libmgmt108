import axios from "axios"

const baseURL = "http://localhost:8085/booklib/api/v1/books"

const AddBookData = async(book: any) => {
    //update the book
    try {
        const response = await axios.post(
            baseURL,
            book
        );
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error("Failed to Update book", error)
        throw error   
    }
}

const DeleteBook = async(bookId: string) => {
    //update the book
    try {
        const response = await axios.delete(
            `${baseURL}?bookIdKey=${bookId}`
        );
        return response.data
    } catch (error) {
        console.error("Failed to Delete book", error)
        throw error   
    }
}

const GetBooks = async() => {
    //get the books
    try {
        const response = await axios.get(`${baseURL}/getallbooks`)
        return response.data
    } catch (error) {
        console.error("Failed to get books", error)
        throw error   
    }
}

const UpdateBook = async(book: any) => {
    //update the book
    try {
        const response = await axios.patch(
            `${baseURL}?bookId=${book.bookId}`,
            book
        );
        return response.data
    } catch (error) {
        console.error("Failed to Update book", error)
        throw error   
    }
}

export {AddBookData, DeleteBook, GetBooks, UpdateBook}