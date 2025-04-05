import axios from "axios"

const baseURL = "http://localhost:3700/api/v1/lendings"

const fetchToken = () => {
    const token = localStorage.getItem("libToken")
    return "Bearer " + token
}

const AddLendingData = async(lending: any) => {
    //add the lending
    console.log(lending);
    delete lending.lendingId;
    delete lending.isActiveLending;
    delete lending.overDueDays;
    delete lending.returnDate;
    delete lending.fineAmount;
    delete lending.lendingDate;
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
            `${baseURL}/${lendingId}`,
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
        const response = await axios.get(`${baseURL}`,
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
            `${baseURL}/${lending.lendingId}`,
            lending,
            {
                headers: {
                    Authorization: fetchToken()
                }
            }
        );
        return response.data
    } catch (error) {
        console.error("Failed to Update Lending", error)
        throw error   
    }
}

export {AddLendingData, DeleteLending, GetLendings, UpdateLending}