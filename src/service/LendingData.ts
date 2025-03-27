import axios from "axios"

const baseURL = "http://localhost:8085/booklib/api/v1/lendings"

const fetchToken = () => {
    const token = localStorage.getItem("libToken")
    return "Bearer " + token
}

const AddLendingData = async(lending: any) => {
    //add the lending
    try {
        const response = await axios.post(
            baseURL,
            lending,
            {
                headers: {
                    Authorization: fetchToken()
                }
            }
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
            `${baseURL}?lendingId=${lendingId}`,
            {
                headers: {
                    Authorization: fetchToken()
                }
            }
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
        const response = await axios.get(`${baseURL}/getalllendings`,
            {
                headers: {
                    Authorization: fetchToken()
                }
            }
        );
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
            lending,
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

export {AddLendingData, DeleteLending, GetLendings, UpdateLending}