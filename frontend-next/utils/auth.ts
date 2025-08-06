import { authResponseType, LoginType, SignupType } from "./types";
import axios from "axios";

export const signup = async (userObj: SignupType): Promise<authResponseType> => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/signup`,
            userObj
        );
        console.log(response)
        localStorage.setItem('token',(response.data as any).token);
        return {
            message: (response.data as any).message,
            isSuccess: true,
            statusCode: response.status,
        };
    } catch (error: any) {
        let errMsg = error.response?.data?.message ||"signup failed";
        let status = error.response?.status || 500

        
            errMsg = error.response?.data?.message || error.message;
            status = error.response?.status || 500;
        

        return {
            message: errMsg,
            isSuccess: false,
            statusCode: status,
        };
    }
};

export const login = async (userObj:LoginType): Promise<authResponseType> => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/login`,
            userObj
        );
        console.log(response)
        localStorage.setItem("token",(response.data as any).token);
        return {
            message: (response.data as any).message,
            isSuccess: true,
            statusCode: response.status,
        };
    } catch (error: any) {
        let errMsg = error.response?.data?.message ||"signup failed";
        let status = error.response?.status || 500

        
            errMsg = error.response?.data?.message || error.message;
            status = error.response?.status || 500;
        

        return {
            message: errMsg,
            isSuccess: false,
            statusCode: status,
        };
    }
};
