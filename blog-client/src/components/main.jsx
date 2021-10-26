import 'bootstrap/dist/css/bootstrap.min.css'
import {BlogsGet, UsersGet, PhotosGet} from '../api/blogController'
import { useEffect, useState } from "react";

 function Main(){
     const [isLoaded, setIsLoaded] = useState(false);
     const [data, setData] = useState({});
     useEffect(() => {
        BlogsGet().then(x => {setIsLoaded(true); setData(x)});
     }, [])

     if(isLoaded){
         console.log(data);
         return(
             <div>
            <div className="w-100 card"></div>
        </div>
    );
}
    else
    return (<></>);
}

export default Main;