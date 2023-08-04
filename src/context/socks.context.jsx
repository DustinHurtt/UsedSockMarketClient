
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import { get } from "../services/authService";

const SockContext = createContext()

const SockProvider = ({ children }) => {

    const [socks, setSocks] = useState([])

    const getSocks = () => {

        get('/socks')
            .then((response) => {
                console.log("Socks", response.data)
                setSocks(response.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <SockContext.Provider value={{ socks, getSocks, setSocks}}>
            {children}
        </SockContext.Provider>
    )
}

export { SockContext, SockProvider }