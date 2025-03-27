import axios from "axios"

const baseURL = "http://localhost:8085/booklib/api/v1/members"

const fetchToken = () => {
    const token = localStorage.getItem("libToken")
    return "Bearer " + token
}

const AddMemberData = async(member: any) => {
    //update the book
    try {
        const response = await axios.post(
            baseURL,
            member,
            {
                headers: {
                    Authorization: fetchToken()
                }
            }
        );
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error("Failed to add member", error)
        throw error   
    }
}

const DeleteMember = async(memberId: string) => {
    //update the book
    try {
        const response = await axios.delete(
            `${baseURL}?memberId=${memberId}`,
            {
                headers: {
                    Authorization: fetchToken()
                }
            }
        );
        return response.data
    } catch (error) {
        console.error("Failed to Delete member", error)
        throw error   
    }
}

const GetMembers = async() => {
    //get the books
    try {
        const response = await axios.get(`${baseURL}/getallmembers`,
            {
                headers: {
                    Authorization: fetchToken()
                }
            }
        );
        return response.data
    } catch (error) {
        console.error("Failed to get members", error)
        throw error   
    }
}

const UpdateMember = async(member: any) => {
    //update the book
    try {
        const response = await axios.patch(
            `${baseURL}?memberId=${member.memberId}`,
            member,
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

export {AddMemberData, DeleteMember, GetMembers, UpdateMember}