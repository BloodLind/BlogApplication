import '../../styles/site.css'
import '../../styles/default-namespace.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

function RightSecondCard(props) {
    return (
        <div className="card parent border-0 round-button d-flex flex-column align-items-baseline justify-content-end ms-3 me-3 opacity-trigger shadow" style={{
            backgroundImage: props.photo == null ? 'url(/drawable/logoblack.png)' : `url(${props.photo})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPositionX: '50%',
            backgroundPositionY: '50%',
            width: 430,
            height: 410,
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="child" viewBox="0 0   673.859 261.918" style={{
                position: 'absolute',
                top: '243.5px',
            }}>
                <path d="M8.956,334.69H665.451a8.5,8.5,0,0,0,8.227-8.749h0c0-4.832.486-137.155,0-224.449L69,73.594C43.753,72.638,21.187,69.68.034,86.421l.695,239.52A8.5,8.5,0,0,0,8.956,334.69Z" transform="translate(-0.034 -72.772)" fill="#191919" opacity="0.9"
                    style={
                        {
                            mixBlendMode: 'multiply',
                            isolation: 'isolate'
                        }} />
            </svg>

            <div className="opacity-trigger child" style={{
                position: 'absolute',
                top: '210px',
                left: '0',
                maxHeight: '190px'
            }}>

                <h3 className="agency fs-2 me-4 color-light ms-4 mt-5 opacity-trigger" style={{ maxHeight: '100px' }} >{props.article.title}</h3>
                <h5 className="agency fs-6 color-sub-light ms-4 ps-3 mt-2" style={{
                }}>
                    by {props.author}
                </h5>
            </div>

            <Link className="btn bg-accent color-light yu-gothic fs-5 round-button m-3 me-5 col-3 opacity-button hidden align-self-end" to={'/article/' + props.article.id}
                style={{
                    position: 'relative',
                    width: '110px',
                    height: '45px',
                    top: '-15px'
                }}>More</Link>

        </div>
    );

}

export default RightSecondCard;