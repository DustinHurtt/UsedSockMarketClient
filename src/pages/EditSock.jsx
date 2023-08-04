import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { SockContext } from "../context/socks.context"

import { get, post } from "../services/authService"


const EditSock = () => {

    const [sock, setSock] = useState(null)

    const { socks, setSocks } = useContext(SockContext)

    const { sockId } = useParams()

    const navigate = useNavigate()


    const handleTextChange = (e) => {
        setSock((prev) => ({...prev, [e.target.name]: e.target.value}))
      }

    const handleNumberChange = (e) => {
        setSock((prev) => ({...prev, [e.target.name]: Number(e.target.value)}))
    }

    const handleSubmit = (e) => {

        e.preventDefault()

        post(`/socks/sock-update/${sockId}`, sock)
            .then((response) => {

                let newSocks = [...socks]
                let sockIndex = socks.findIndex(sock => sock._id === response.data._id)
                newSocks[sockIndex] = response.data
                
                setSocks(newSocks)

                navigate(`/sock-details/${response.data._id}`)
            })
            .catch((err) => {
                console.log(err)
            })


    }

    useEffect(() => {

        if(!socks.length) {

            get(`/socks/sock-detail/${sockId}`)
                .then((response) => {
                    console.log("Found sock", response.data)
                    setSock(response.data)
                })
                .catch((err) => {
                    console.log(err)
                })

        } else {

            let thisSock = socks.find((sock) => sock._id === sockId)
    
            setSock(thisSock)
        }

    }, [])

  return (
    <div>
       <h1>Edit Sock</h1>

       {sock ? 
       
       <form onSubmit={handleSubmit}>

            <label>Image</label>
            <input type="text" name="image" value={sock.image} onChange={handleTextChange} /> 

            <label>Size</label>
            <input type="text" name="size" value={sock.size} onChange={handleTextChange} /> 

            <label>Color/Pattern</label>
            <input type="text" name="colorPattern" value={sock.colorPattern} onChange={handleTextChange} /> 

            <label>Material</label>
            <input type="text" name="material" value={sock.material} onChange={handleTextChange} /> 

            <label>Story</label>
            <input type="text" name="story" value={sock.story} onChange={handleTextChange} /> 

            <label>Cost</label>
            <input type="number" name="cost" value={sock.cost} onChange={handleNumberChange} /> 

            <button type="submit">Update Sock</button>

       </form>

       : <p>Loading...</p>
       
       }

    </div>
  )
}

export default EditSock