import '../../styles/site.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom'

function LeftCard(props){

    return (
    <div className="card parent round-button border-0 ms-3 me-3 opacity-trigger p-0 shadow" style={{
        backgroundImage:props.photo == null? 'url(/drawable/logoblack.png)' : `url(${props.photo})`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        backgroundPositionX:'50%',
        backgroundPositionY:'50%',
        width:500,
        height:400,
    }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="child"  viewBox="0 0 663.387 371.949">
        <path d="M7.934,0H654.407c4.474,0,8.1,4.477,8.1,10h0c0,5.523-.371,162.88-.849,262.657L23.391,370.433c-4.474,0-24.27,4.18-24.27-1.343L-.167,10C-.167,4.477,3.46,0,7.934,0Z" transform="translate(0.879)" fill="#191919" opacity="0.9" 
        style={{mixBlendMode: "multiply",
        isolation: "isolate"}}/>
</svg>
<div className="opacity-trigger child" style={{
            position:'absolute',
            top:'0',
            left:'0',
            maxHeight:'190px'
        }}>

        <h3 className="agency text-x-large me-4 color-light ms-4 mt-5 opacity-trigger" style={{maxHeight:'100px'}} >{props.article.title}</h3>
        <h5 className="agency text-larger color-sub-light ms-4 ps-3 mt-2" style={{
        }}>
            by {props.author}
        </h5>
            </div>
        <Link className="btn bg-accent color-light yu-gothic text-large round-button m-3 me-5 col-3 opacity-button hidden align-self-end" to={'/article/' + props.article.id}
        style={{
            position:'relative',
            width:'110px',
            height:'45px',
            top:'-95px'
        }}>More</Link>

    </div>
    );
}

export default LeftCard;

