export interface Root {
    status: string
    data: Daum[]
}

export interface Daum {
    login: boolean
    _id: string
    username: string
    password: string
    name: string
    roles: string
    createtime: string
    timeout: string
    access_ip: string[]
    __v: number
}


const getUsers = async () => {
    let response = await fetch(process.env.REACT_APP_API_URL + "getUsers")
    let response_json: Root = await response.json();
    if (response_json.status === "success") {
        const result = response_json.data
        return result;
    }
}

export default getUsers;
