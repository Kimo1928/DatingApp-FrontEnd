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

    UserName:string,
    email:string,
    password:string,
    gender:string,
    city:string,
    country:string,
    dateOfBirth:string,

}

export interface userDTO{

    id:string ,
    displayName:string,
    dateOfBirth:string,
    created:string,
    lastActive:string,
    gender:string,
    description?:string,
    city:string,
    country:string,

    imageUrl?:string
}

export interface EditableUser{
    displayName:string , 
    description?:string,
    city :string,
    country:string,
    
}