export interface user{

    id:string ,
    displayName:string,
    email:string,
    imageUrl?:string,
    token:string

}

export type loginCreds ={

    email:string,
    password:string
}

export type registerCreds={

    displayName:string,
    email:string,
    password:string

}