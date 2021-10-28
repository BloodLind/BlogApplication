import 'bootstrap/dist/css/bootstrap.min.css'
import {BlogsGet, UsersGet, PhotosGet} from '../api/blogController'
import { useEffect, useState } from "react";
import '../styles/site.css'
import {Link} from 'react-router-dom'

import LeftCard from './cards/LeftCard';
import RightCard from './cards/RightCard';
import LeftSecondCard from './cards/LeftSecondCard';
import RightSecondCard from './cards/RightSecondCard';
import CreatorCard from './cards/CreatorCard';
 function Main(){
     const [isLoaded, setIsLoaded] = useState(false);
     const [data, setData] = useState({});
     const [photos, setPhotos] = useState([]);
     const [authors, setAuthors] = useState([]);
     useEffect(() => {
        BlogsGet().then(x => 
            {
            setData(x); 
            PhotosGet(x.result.map(y => y.previewPhotoId)).then(p => {
                setPhotos(p);
                UsersGet(x.result.map(a => a.authorId)).then(z => {setAuthors(z); setIsLoaded(true)})
                })
            });
     }, [])

     if(isLoaded == true){
         console.log(data);
         console.log(photos);
         console.log(authors);
         return(
             <>
             <div className='color-light d-flex flex-column justify-content-center'>
            <div className="w-100 card m-5 round-card align-self-center align-content-between justify-content-between" style={{
                backgroundImage: `url(${data.result[0].previewPhotoId == null ? '/drawable/logowithtextdark.png' : photos[0].data})`,
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
                        by {authors.userDatas.filter(x => x.id == data.result[0].authorId)[0].name}
                    </h6>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-bottom p-2">
                    <h4 className="agency text-super-larger m-5 rounded-button text-nowrap">Popular today</h4>
                    <a className="btn bg-sub-dark agency 
                    p-1 ps-5 pe-5 text-super-large m-5 round-button text-light text-center align-content-center
                    opacity-button">Explore</a>
                </div>
                </div>
            </div>
            
            <div className="d-flex flex-row m-5 mb-0 p-5 align-items-baseline gap-5">
                <h4 className="text-super-xx-large agency text-nowrap">New Memories</h4>
                <div className=" line-dark w-75"></div>
            </div>
            
            <div className="d-flex flex-row justify-content-center align-content-center align-items m-5 mt-0 mb-0 p-5 pt-0 gap-4">
                <div className="d-flex flex-column gap-5">

                <LeftCard 
                article={data.result[1]} 
                author={authors.userDatas.filter(x => x.id == data.result[1].authorId)[0].name}
                photo={photos.filter(x => x.id == data.result[1].previewPhotoId)[0]?.data}></LeftCard>
                <LeftSecondCard
                 article={data.result[2]} 
                 author={authors.userDatas.filter(x => x.id == data.result[2].authorId)[0].name}
                 photo={photos.filter(x => x.id == data.result[2].previewPhotoId)[0]?.data}></LeftSecondCard>
                </div>
                <div className="d-flex flex-column gap-5">

                <RightCard
                 article={data.result[3]} 
                 author={authors.userDatas.filter(x => x.id == data.result[3].authorId)[0].name}
                 photo={photos.filter(x => x.id == data.result[3].previewPhotoId)[0]?.data}></RightCard>
                <RightSecondCard
                 article={data.result[4]} 
                 author={authors.userDatas.filter(x => x.id == data.result[4].authorId)[0].name}
                 photo={photos.filter(x => x.id == data.result[4].previewPhotoId)[0]?.data}></RightSecondCard>
                </div>
            </div>
            <Link className="btn opacity-button bg-sub-dark agency text-super-large text-white align-self-center ps-5 pe-5 round-card" to='/explore' style={{width:'250px'}}>Explore More</Link>
            <div className="d-flex flex-row m-5 mb-0 p-5 align-items-baseline gap-5">
                <h4 className="text-super-xx-large agency text-nowrap">Today Creators</h4>
                <div className=" line-dark w-75"></div>
            </div>

            <div className="d-flex flex-row justify-content-center gap-5 mb-5">
                <CreatorCard author={authors.userDatas[0]}></CreatorCard>
                <CreatorCard author={authors.userDatas[1]}></CreatorCard>
                <CreatorCard author={authors.userDatas[2]}></CreatorCard>
                <CreatorCard author={authors.userDatas[3]}></CreatorCard>
            </div>

            <div className="d-flex flex-row bg-dark-color color-light align-items-center justify-content-around" style={{
                height:'700px',
                padding:'15em'
            }}>
                <div className="ocr m-5" style={{
                    fontSize:'27em'
                }}>?</div>
                <div className="d-flex flex-column gap-5 m-5">
                    <h3 className="agency" style={{
fontSize:'5em'
                    }}>Does not find need article? <br></br> Come on and create your own</h3>

                    <Link to="/create" className="btn opacity-button bg-accent agency text-super-x-larger color-light m-5 mt-0 mb-0 round-button">Create new memory</Link>
                </div>
            </div>
            </>
    
    );
}
    else
    return (<></>);
}

export default Main;