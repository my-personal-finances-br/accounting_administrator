import axios from 'axios'
import { returnCurrentBaseUrl } from "../../utils/URL/baseUrl";

const baseUrl = returnCurrentBaseUrl()

const authenticatedApi = axios.create({
    baseUrl: returnCurrentBaseUrl()
})

const auth = ({username, password}) => {

    const response = axios.post(
        `http://localhost:8000/api/internal/authenticate/generics`,
        {username, password},
        {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': ''
            },
        }
    )
    .then((resp) => resp)
    .catch((error) => error)
    return response
}

export { auth }