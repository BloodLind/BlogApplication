import '../../styles/site.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom'

function RightSecondCard(){
    return (
    <div className="card border-0 round-button d-flex flex-column align-items-baseline justify-content-end ms-3 me-3 opacity-trigger" style={{
        backgroundImage:`url(https://appleinsider.ru/wp-content/uploads/2021/10/new_pixel_phone6-750x441.jpg)`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        width:380,
        height:400,
    }}>
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 673.859 261.918" style={{
            position:'absolute',
            top:'251.5px',
        }}>
  <path  d="M8.956,334.69H665.451a8.5,8.5,0,0,0,8.227-8.749h0c0-4.832.486-137.155,0-224.449L69,73.594C43.753,72.638,21.187,69.68.034,86.421l.695,239.52A8.5,8.5,0,0,0,8.956,334.69Z" transform="translate(-0.034 -72.772)" fill="#191919" opacity="0.9"
   style={
       {
       mixBlendMode: 'multiply',
       isolation: 'isolate'
       }}/>
</svg>
    
<div className="opacity-trigger" style={{
            position:'absolute',
            top:'230px',
            left:'0',
            maxHeight:'190px'
        }}>

        <h3 className="agency text-super-large color-light ms-4 mt-5 opacity-trigger" >Pixel 6 and new on Google's presentation</h3>
        <h5 className="agency text-large color-sub-light ms-4 ps-3 mt-2" style={{
        }}>
            by ArthurMog
        </h5>
            </div>

        <Link className="btn p-0 pt-1bg-accent color-light yu-gothic text-large round-button m-3 me-5 col-3 opacity-button hidden align-self-end" to="/article"
        style={{
            position:'relative',
            width:'110px',
            height:'35px',
            top:'-15px'
        }}>More</Link>

    </div>
    );
    
}

export default RightSecondCard;