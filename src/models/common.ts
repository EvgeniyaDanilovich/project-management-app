export interface User {
    _id:	string
    name:	string
    login:	string
}

export interface Board {
    _id:	string
    title:	string
    owner:	string
    users:	User[]
}