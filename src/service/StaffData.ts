import axios from "axios"

const baseURL = "http://localhost:8085/booklib/api/v1/staff"

const AddStaffData = async(staff: any) => {
    //add the staff member
    try {
        const response = await axios.post(
            baseURL,
            staff
        );
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error("Failed to add staff member", error)
        throw error   
    }
}

const DeleteStaff = async(staffId: string) => {
    //delete the staff member
    try {
        const response = await axios.delete(
            `${baseURL}?staffId=${staffId}`
        );
        return response.data
    } catch (error) {
        console.error("Failed to Delete staff member", error)
        throw error   
    }
}

const GetStaffs = async() => {
    //get the books
    try {
        const response = await axios.get(`${baseURL}/getallstaff`)
        return response.data
    } catch (error) {
        console.error("Failed to get staff members", error)
        throw error   
    }
}

const UpdateStaff = async(staff: any) => {
    //update the book
    try {
        const response = await axios.patch(
            `${baseURL}?staffId=${staff.staffId}`,
            staff
        );
        return response.data
    } catch (error) {
        console.error("Failed to Update staff member", error)
        throw error   
    }
}

export {AddStaffData, DeleteStaff, GetStaffs, UpdateStaff}