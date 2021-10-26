import 'bootstrap/dist/css/bootstrap.min.css'
import {BlogsGet, UsersGet, PhotosGet} from '../api/blogController'
import { useEffect, useState } from "react";
import '../styles/site.css'
import imageLightness from '../services/imageLightness'
import LeftCard from './cards/LeftCard';
import RightCard from './cards/RightCard';

 function Main(){
     const [isLoaded, setIsLoaded] = useState(false);
     const [data, setData] = useState({});
     
     useEffect(() => {
        BlogsGet().then(x => {setData(x); setIsLoaded(true)});
     }, [])

     if(isLoaded){
         console.log(data);
         return(
             <>
             <div className='color-light d-flex flex-column justify-content-center'>
            <div className="w-100 card m-5 round-card align-self-center align-content-between justify-content-between" style={{
                backgroundImage: `url(${data.result[0].previewPhotoId == null ? 'https://cdn.mos.cms.futurecdn.net/VWDjz9b7qcKSpKhy2DSuaE.jpg' : data.result[0].photo.data})`,
                height: 525 + 'px',
                backgroundRepeat: 'no-repeat',
                backgroundPositionX: `50%`,
                backgroundPositionY: `50%`,
                backdropFilter: 'brightness(0.4)',
                backgroundColor:'rgba(8, 8, 8, 0.366)',
                backgroundBlendMode:'darken',
                maxWidth:1350 + 'px',
                width:1300+'px !important',
            }}>
                <div className="m-5 pt-3">
                    <h4 className="text-super-x-larger agency col-8">
                   {data.result[0].title}
                    </h4>
                    <h6 className="text-super-large agency color-sub-light">
                        by AuthorMog
                    </h6>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-bottom p-2">
                    <h4 className="agency text-super-larger m-5 rounded-button">Popular today</h4>
                    <a className="btn bg-sub-dark agency 
                    p-1 ps-5 pe-5 text-super-large m-5 round-button text-light text-center align-content-center
                    opacity-button">Explore</a>
                </div>
                </div>
            </div>
            
            <div className="d-flex flex-row m-5 mb-0 p-5 align-items-baseline gap-5">
                <h4 className="text-super-xx-large agency">New Memories</h4>
                <div className=" line-dark w-75"></div>
            </div>
            
            <div className="d-flex flex-wrap justify-content-center align-content-center align-items-baseline m-5 mt-0 mb-0 p-5 pt-0">
                <LeftCard></LeftCard>
                <RightCard></RightCard>
            </div>

            <div className="d-flex flex-row m-5 mb-0 p-5 align-items-baseline gap-5">
                <h4 className="text-super-xx-large agency">Today Creators</h4>
                <div className=" line-dark w-75"></div>
            </div>
            </>
    
    );
}
    else
    return (<></>);
}

export default Main;