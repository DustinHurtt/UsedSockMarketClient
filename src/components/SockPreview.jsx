import { Link } from "react-router-dom";

const SockPreview = ({ sock }) => {
    
  return (


        <Link to={`/sock-details/${sock._id}`}>
          <div>
            <img id="preview" src={sock.image} alt="sock" />
            <p>{sock.size}</p>
            <p>{sock.cost}</p>
          </div>
        </Link>


  );
};

export default SockPreview;
