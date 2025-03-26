import axios from "axios"

const baseURL = "http://localhost:8085/booklib/api/v1/lendings"

const AddLendingData = async(lending: any) => {
    //add the lending
    try {
        const response = await axios.post(
            baseURL,
            lending
        );
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error("Failed to Add lending", error)
        throw error   
    }
}

const DeleteLending = async(lendingId: string) => {
    //delete the lending
    try {
        const response = await axios.delete(
            `${baseURL}?lendingId=${lendingId}`
        );
        return response.data
    } catch (error) {
        console.error("Failed to delete lending", error)
        throw error   
    }
}

const GetLendings = async() => {
    //get the lendings
    try {
        const response = await axios.get(`${baseURL}/getalllendings`)
        return response.data
    } catch (error) {
        console.error("Failed to get lendings", error)
        throw error   
    }
}

const UpdateLending = async(lending: any) => {
    //update the book
    try {
        const response = await axios.patch(
            `${baseURL}?lendingId=${lending.lendingId}`,
            lending
        );
        return response.data
    } catch (error) {
        console.error("Failed to Update book", error)
        throw error   
    }
}

export {AddLendingData, DeleteLending, GetLendings, UpdateLending}