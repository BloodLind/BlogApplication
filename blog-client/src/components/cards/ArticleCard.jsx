import '../../styles/site.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom'

export default function ArticleCard(props){
return(
    <div className="m-5" style={{
        width:'1000px',
        height:'400px',
        backgroundImage: props.photo == null? 'url(/drawable/logowithtextdark.png)' : `url(${props.photo})`,
        borderRadius:'10px',
        backgroundPositionX:'50%',
        backgroundPositionY:'50%',
        backgroundRepeat:'no-repeat',
    }}>
        <div className="w-100 h-100 p-5" style={{
            background: 'linear-gradient(90deg, rgba(0,0,0,0.5494398442970938) 0%, rgba(25,25,25,1) 73%)',
            borderRadius:'10px',
        }}>
            <h3 className="agency text-x-large me-4 color-light opacity-trigger" style={{maxHeight:'100px'}} >Aboiba</h3>
        </div>
    </div>
);

}