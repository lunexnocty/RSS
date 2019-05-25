import api from "./index";


export async function delete() {
    return await api.post('/user/delete',{

    })
}

export async function modify(){
    return await api.post('/user/modify',{

    })
}


export async function changePassword(){
    return await api.post('/user/password',{

    })
}

