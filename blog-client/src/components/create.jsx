import 'bootstrap/dist/css/bootstrap.min.css'
import { BlogsGet, UsersGet, PhotosGet } from '../api/blogController'
import { useEffect, useState } from "react";
import '../styles/create.css'
import '../styles/forms.css'
import '../styles/editorJSSets.css'
 import '../styles/default-namespace.jsx'
import { Link } from 'react-router-dom'
import LeftCard from './cards/LeftCard';
import RightCard from './cards/RightCard';
import LeftSecondCard from './cards/LeftSecondCard';
import RightSecondCard from './cards/RightSecondCard';
import CreatorCard from './cards/CreatorCard';
import {GetPhotos} from '../api/apiKeys'
import EditorJS from '@editorjs/editorjs';
import '../styles/cards.css'
function Create() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState({});
    const [authors, setAuthors] = useState([]);
    const editor = new EditorJS('editorjs');
    useEffect(() => {
        
    }, []);
    if (true) {
        return (
            <>
            <div className="container ">
                

                <div className="d-flex flex-row m-2  align-items-baseline gap-5">
                    <h4 className="text-x-large agency text-nowrap" >Your Title</h4>
                    <div className=" line-dark w-100 "></div>
                </div>
  
                    <input className="w-100 agency fs-4 form-control border-0 shadow" placeholder="Hello, my name huylo" ></input>

                <div className="d-flex flex-row m-2   align-items-baseline gap-5">
                    <h4 className="text-x-large agency text-nowrap">Create Own Memory</h4>
                    <div className=" line-dark w-100"></div>
                </div>
                
               
                {/* <div className="editorJSContainer delete-select-border"> </div> */}
               
                <div id="editorjs" className="delete-select-border yu-gothic-medium fs-5 " ></div>
                <div className="d-flex flex-row m-2  align-items-baseline gap-5 mt-5 mb-5">
                    <h4 className="text-x-large agency text-nowrap" >Imagine The Look</h4>
                    <div className=" line-dark w-100 "></div>
                </div>
               
                <div className=" col-8 align-self-center round-button " >
                    <img src={window.location.protocol + "//" + window.location.host + "/drawable/loadimageprev.png"} className="w-100 h-100 round-card" style={{objectFit:"cover"}}></img>
                    <div></div>

                </div>
               
              </div>
</>
        );
    }
    else
        return (<></>);
}


export default Create;