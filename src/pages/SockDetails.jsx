import { useContext, useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { SockContext } from "../context/socks.context"
import { AuthContext } from "../context/auth.context"
import { CartContext } from "../context/cart.context"

import { post } from "../services/authService"


const SockDetails = () => {

    const [sock, setSock] = useState(null)

    const { socks, getSocks, setSocks } = useContext(SockContext)

    const { user } = useContext(AuthContext)

    const { cart, setCart } = useContext(CartContext)

    const { sockId } = useParams()

    const navigate = useNavigate()

    const isOwner = () => {
        return user._id === sock.owner._id
    }

    const deleteSock = () => {

        post(`/socks/delete-sock/${sockId}`, sock)
            .then((response) => {
                let newSocks = socks.filter(sock => sock._id !== response.data._id)
                setSocks(newSocks)
                navigate('/all-socks')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const addToCart = () => {
                
        if(cart.message) {
            
            const body = {
                sockId,
                sockCost: sock.cost,
                // subtotal: sock.cost,
                // total: sock.cost * 1.08
            }

            console.log("Body", body)

            console.log("User", user)

            post('/cart/create', body)
                .then((response) => {
                    console.log("New cart", response.data)
                    setCart(response.data)
                    navigate('/cart')
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            const body = {
                sockId,
                sockCost: sock.cost,
                // subtotal: sock.cost
                // subtotal: cart.subtotal + sock.cost,
                // total: (cart.subtotal + sock.cost) * 1.08,
                cartId: cart._id
            }

            console.log("CART EXISTS", cart.message)

            post('/cart/update', body)
            .then((response) => {
                console.log("Updated cart", response.data)
                setCart(response.data)
                navigate('/cart')
            })
            .catch((err) => {
                console.log(err)
            })
        }
        // sockId, subtotal, total, cartId
    }

    useEffect(() => {

        if(!socks.length) {
            getSocks()
        }

        let thisSock = socks.find((sock) => sock._id === sockId)

        setSock(thisSock)

    }, [sockId, socks])


  return (
    <div>
        <h1>SockDetails</h1>

        {
            sock ?

            <div>

                {isOwner() &&  
                    <>
                        <Link to={`/edit-sock/${sock._id}`}><button>Edit Sock</button></Link>
                        <button onClick={deleteSock}>Remove Listing</button>
                    </>
                }
                {!isOwner() &&  
                    <>
                        <button onClick={addToCart} >Add to Cart</button>
                    </>
                }

                <img id="sock-detail" src={sock.image} alt="sock" />
                <p>{sock.size}</p>
                <p>{sock.material}</p>
                <p>{sock.colorPattern}</p>
                <p>Story: {sock.story}</p>
                <h5>${sock.cost}</h5>
                <h6>Sold by: {sock.owner.username}</h6>
                    <>

                            {

                                sock.comments.length ? (

                                    <>
                                        {
                                            sock.comments.map((comment) => {
                                                return (
                                                    <>
                                                        <p>{comment.comment}</p>
                                                        <h6>-{comment.author.username}</h6>
                                                    </>
                                                )
                                            })
                                        }
                                    </>                                    

                                ) : null

  

                            }
                    </>
            </div>

            : <p>Loading...</p>

        }
    

    </div>

  )
}

export default SockDetails




