import axios from "axios"

const baseURL = "http://localhost:3700/api/v1/books"


const fetchToken = () => {
    const token = localStorage.getItem("libToken")
    return "Bearer " + token
}

const AddBookData = async(book: any) => {
    //update the book
    delete book.bookId;
    try {
        const response = await axios.post(
            baseURL,
            book,{
                headers: {
                    Authorization: fetchToken()
                }
            }
        );
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error("Failed to Add book", error)
        throw error   
    }
}

const DeleteBook = async(bookId: string) => {
    //update the book
    try {
        const response = await axios.delete(
            `${baseURL}/${bookId}`,
            {
                headers: {
                    Authorization: fetchToken()
                }
            }
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
        const response = await axios.get(`${baseURL}`,
            {
                headers: {
                    Authorization: fetchToken()
                }
            }
        );
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
            `${baseURL}/${book.bookId}`,
            book,
            {
                headers: {
                    Authorization: fetchToken()
                }
            }
        );
        return response.data
    } catch (error) {
        console.error("Failed to Update book", error)
        throw error   
    }
}

export {AddBookData, DeleteBook, GetBooks, UpdateBook}