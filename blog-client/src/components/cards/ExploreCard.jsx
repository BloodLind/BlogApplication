import 'bootstrap/dist/css/bootstrap.min.css'
import '../../styles/site.css'
import '../../styles/explore.css'
import '../../styles/default-namespace.jsx'
import { Link } from 'react-router-dom'


export default function ExploreCard(props) {
    return (<>

        <Link className="col-9 m-5 mt-3 mb-3 round-card d-flex flex-row gap-0 explore-card text-decoration-none" to={'/article/' + props.article.id}>
            <div className="col-4 d-flex flex-column" style={{
                 background: props?.photo == undefined ? `url(${window.location.protocol + "//" + window.location.host + "/drawable/logowhite.png"})` : `url(${props.photo.data})`,
                 backgroundRepeat: 'no-repeat',
                position: 'relative',
                 backgroundSize: 'cover',
                 borderRadius:'15px 0px 0px 15px',
                 backgroundPositionX: '50%',
                 backgroundPositionY:'50%',
            }}>
                <img loading="lazy" src={ !props?.photo  ? `${window.location.protocol + "//" + window.location.host + "/drawable/logowhite.png"}` : props.photo } style={{
                    borderRadius: '15px 0px 0px 15px',
                    objectFit: 'cover',
                    height: '100%'
                }}>
                </img>
                <div className="w-100 h-100" style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(25,25,25,1) 87%)',
                    borderRadius: '15px 0px 0px 15px',
                }}></div>
            </div>
            <div className='color-sub-light h-100 p-5 pb-3 d-flex flex-column content w-100'>
                <h3 className="agency fs-1 color-light">{props.article?.title}</h3>
                <p className="agency fs-3 ms-2" style={{
                    maxHeight: '90px',
                    height: '90px',
                    whiteSpace: 'wrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
  
                }}>{props.article?.innerData}</p>
                <h5 className="agency fs-4 ms-2 mt-0">by {props.author?.name}</h5>
            </div>
        </Link>
    </>)
}