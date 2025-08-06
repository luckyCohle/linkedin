export interface SignupType {
    email : string;
    username: string;
    password: string;
    imgUrl? : string;
    bio?    : string;
}

export interface LoginType{
    email:string;
    password:string;
}

export interface authResponseType{
    message: string;
    statusCode: number;
    isSuccess:boolean
}
export interface postType {
    username :string,
    title:string,
    createdAt:string,
    description:string
}