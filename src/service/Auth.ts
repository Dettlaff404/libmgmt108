import axios from "axios";

const baseAuthURL = "http://localhost:8085/booklib/api/v1/auth";

const SignUpTask = async (signUp: any) => {
    console.log(signUp)
    try {
        const signUpResponse = await axios.post(
            `${baseAuthURL}/signup`,
            signUp
        );
        console.log(signUpResponse.data.token);
        return signUpResponse.data.token
    } catch (error) {
        console.error("Failed to sign up", error);
        throw error
    }
}