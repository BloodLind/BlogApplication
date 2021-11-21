import '../../styles/site.css'
import '../../styles/default-namespace.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

export default function ArticleCard(props) {
    var date = new Date(props.article?.publicationDate);
    return (
        <div className="m-5 mb-0" style={{
            width: '1000px',
            height: '400px',
            backgroundImage: props.photo == null ? window.location.protocol + "//" + window.location.host + "/drawable/logowithTextlight.png" : `url(${props.photo.data})`,
            borderRadius: '10px',
            backgroundPositionX: '75%',
            backgroundPositionY: '35%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>
            <div className="w-100 h-100 p-5 d-flex flex-row gap-3 justify-content-between" style={{
                background: 'linear-gradient(90deg, rgba(0,0,0,0.3494398442970938) 0%, rgba(25,25,25,0.99) 73%)',
                borderRadius: '10px',
            }}>
                <h3 className="agency text-super-x-larger me-4 color-light opacity-trigger" style={{ maxHeight: '100px', maxWidth: '650px' }} >{props.article?.title}</h3>
                <div className="d-flex flex-column justify-content-between">
                    <div className="d-flex flex-column align-items-center">
                        <img style={{
                            height: '160px',
                            width: '150px',
                            borderRadius: '10px',
                            objectFit: 'cover'
                        }} className="border-0 child" src={props.author?.photo == null ? window.location.protocol + "//" + window.location.host + '/drawable/logowhite.png' : props.author.photo}></img>
                        <h3 className="agency m-2 text-super-large color-light child">{props.author?.name}</h3>
                    </div>
                    <h3 className="agency text-larger color-sub-light">Publication date: {date.getDate()}.{date.getMonth()}.{date.getFullYear()}</h3>
                </div>
            </div>
        </div>
    );

}