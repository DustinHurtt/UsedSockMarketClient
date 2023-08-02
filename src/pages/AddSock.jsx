import { useState, useContext } from "react"
import { AuthContext } from "../context/auth.context"

import { useNavigate } from "react-router-dom"

import { post } from "../services/authService"


const AddSock = () => {

    const { user } = useContext(AuthContext)
    
    const [sock, setSock] = useState({
        owner: user._id,
        image: "",
        size: "",
        colorPattern: "",
        material: "",
        story: "",
        cost: 0
    })

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        post('/socks/new-sock', sock)
            .then((response) => {
                console.log("New Sock", response.data)
                navigate('/all-socks')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleTextChange = (e) => {
        setSock((prev) => ({...prev, [e.target.name]: e.target.value}))
      }

    const handleNumberChange = (e) => {
        setSock((prev) => ({...prev, [e.target.name]: Number(e.target.value)}))
    }
      
  return (
    <div id="add-sock" >
        <h1>Sell Your Socks</h1>

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

            <button type="submit">List Sock</button>

        </form>
    </div>
  )
}

export default AddSock


