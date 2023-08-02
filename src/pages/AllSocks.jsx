import { useContext, useEffect } from "react"
import { SockContext } from "../context/socks.context"
import { Link } from "react-router-dom"

const AllSocks = () => {

    const { socks, getSocks } = useContext(SockContext)

    useEffect(() => {

        getSocks()

    }, [])

  return (
    <div id="all-socks"> 
        <h1>Used Socks for Sale</h1>

        {
            socks.map((sock) => {
                return (
                    <Link to={`/sock-details/${sock._id}`} key={sock._id}>
                        <div>

                            <img id="preview" src={sock.image} alt="sock" />
                            <p>{sock.size}</p>
                            <p>{sock.cost}</p>

                        </div>
                    </Link>
                )
            })
        }
    </div>
  )
}

export default AllSocks