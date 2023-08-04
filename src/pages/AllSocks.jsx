import { useContext, useEffect } from "react"
import { SockContext } from "../context/socks.context"
import { Link } from "react-router-dom"

import SockPreview from "../components/SockPreview"

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

                    <SockPreview key={sock._id} sock={sock} />

                )
            })
        }
    </div>
  )
}

export default AllSocks