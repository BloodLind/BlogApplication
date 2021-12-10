import 'bootstrap/dist/css/bootstrap.min.css'
import { BlogsGet, UsersGet, PhotosGet } from '../api/blogController'
import { useEffect, useState } from "react";
import { useHistory } from 'react-router';
import  useSession  from 'react-session-hook';
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
import EditorConfig from "../services/editorJSConfig"
import '../styles/cards.css'
import EditorJS from '@editorjs/editorjs';
function Create() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState({});
    const [authors, setAuthors] = useState([]);
    const session = useSession();
    const history = useHistory();

    if(session?.token == null){
        history.replace("login");
      }

    const addChip = function(e)
    {
        if(e.target.value.length > 0)
        {
        let chip = document.createElement("div");
              chip.innerHTML = e.target.value;
              chip.onclick = (e)=>{e.target.remove()};
        document.getElementsByClassName("chips")[0].insertBefore(chip, e.target);
        e.target.value = "";
        }
    };
    const onChipInputFocusLast = function(e)
    {
        addChip(e);
    };
    const onChipInputPressedKey  = function(e)
    {
        if (e.key === "Enter") {
        addChip(e);
      }
       
    };
    useEffect(() => {
        
    }, []);
    if (true) {
        return (
            <>
            <div className="d-flex flex-column ps-5 pe-5 m-5">
                

                <div className="d-flex flex-row m-2  align-items-baseline gap-5">
                    <h4 className="text-x-large agency text-nowrap" >Your Title</h4>
                    <div className=" line-dark w-100 "></div>
                </div>
  
                    <input className="w-100 agency fs-4 form-control border-0 shadow" placeholder="Hello, my name huylo" ></input>

                <div className="d-flex flex-row m-2   align-items-baseline gap-5">
                    <h4 className="fs-2 agency text-nowrap">Create Own Memory</h4>
                    <div className=" line-dark w-100"></div>
                </div>
                
               
                {/* <div className="editorJSContainer delete-select-border"> </div> */}
               
                <div id="editorjs" className="delete-select-border agency-headers yu-gothic-medium fs-5" ></div>
                <div className="d-flex flex-row m-2  align-items-baseline gap-5 mt-5 mb-5">
                    <h4 className="text-x-large agency text-nowrap" >Imagine The Look</h4>
                    <div className=" line-dark w-100 "></div>
                </div>
               
                <div className="col-6 align-self-center mb-5  round-card bg-dark-color round-card" style={{maxHeight:"400px"}}>
                    <img src={window.location.protocol + "//" + window.location.host + "/drawable/loadimageprev.png"} className = "w-100 h-100"  
                    style={{maxHeight:"400px",objectFit:"cover",borderRadius:"15px 15px 0px 0px"}}></img>
                    <div>
                    <h4 className="fs-2 agency text-nowrap text-center  text-light p-2" style={{backgroundColor:"#14213D",borderRadius:"0px 0px 15px 15px "}}>Select Photo</h4>
                    </div>

                </div>
                <div className="d-flex flex-row  align-items-baseline gap-5 mt-5 mb-5">
                    <h4 className="text-x-large agency text-nowrap" >Your category</h4>
                    <div className=" line-dark w-100 "></div>
                </div>
                <div htmlFor="chips-input" className="col-10 round-card p-3 m-3 pb-5 agency shadow-lg fs-4 chips align-self-center mb-5">
                 
                   <input type="text" id="chips-input" className="dropdown-toggle dropdown-toggle-split" onBlur={onChipInputFocusLast} onKeyUp={onChipInputPressedKey}  placeholder="Add new..."/>
                   <ul class="dropdown-menu">
                                         <li><a class="dropdown-item" href="#">Action</a></li>
                                         <li><a class="dropdown-item" href="#">Another action</a></li>
                                         <li><a class="dropdown-item" href="#">Something else here</a></li>
                                         
                                         <li><a class="dropdown-item" href="#">Separated link</a></li>
                                    </ul>
                </div>

                <button className="text-light round-card agency p-3 pe-5 ps-5 bg-accent align-self-center w-25 fs-2">Save Memory</button>
               
              </div>
</>
        );
    }
    else
        return (<></>);
}


export default Create;