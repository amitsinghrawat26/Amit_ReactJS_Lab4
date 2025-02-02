import axios from "axios"

const getDataFromServer = () => {
    return axios.get("http://localhost:3001/items")
    .then(reponse => reponse.data)
}

const postDataToServer = (newExpense) => {
    return axios.post("http://localhost:3001/items",newExpense,{
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(reponse => reponse.data)
}

export { getDataFromServer, postDataToServer }
