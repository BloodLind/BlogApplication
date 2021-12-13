import '../../styles/site.css'
import '../../styles/default-namespace.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

function CreatorCard(props) {
    return (
        <Link to={`account/${props.author?.id}`} className=" text-decoration-none m-4 card round-user border-0 d-flex flex-column bg-dark-color align-items-center shadow parent" style={{
            height: '240px',
            width: '170px'
        }}>
            <img style={{
                height: '190px',
                width: '170px',
                borderRadius: '10px',
                objectFit: 'cover'
            }} className="border-0 child" src={props.author?.photo == null ? './drawable/logowhite.png' : props.author.photo}></img>
            <h3 className="agency m-2 fs-2 color-light child">{props.author?.name}</h3>
        </Link>
    );
}

export default CreatorCard;