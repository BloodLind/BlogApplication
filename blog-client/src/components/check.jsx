import '../styles/default-namespace';
import {CheckPath} from '../services/imageChecker';
import { useState, useEffect } from "react";
import { GetSubscribtionArticles, GetSubscribtionCreators } from "../api/blogController";
import useSession from 'react-session-hook';
import { useHistory, Link } from 'react-router-dom';
import Carousel from 'react-grid-carousel'
import React from 'react'
import CreatorCard from './cards/CreatorCard';
import ExploreCard from "./cards/ExploreCard";

const responsive = [
  {
    breakpoint: 1350,
    cols: 3,
    rows: 1,
    loop: true,
  },
  {
    breakpoint: 1050,
    cols: 2,
    rows: 1,
    loop: true,
  },
  {
    breakpoint: 1050,
    cols: 2,
    rows: 1,
    loop: true,
  },
]

export default function Check()
{
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNoSubscriptions, setIsNoSubscriptions] = useState(false);
  const [data, setData] = React.useState({});
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const session = useSession();
  const history = useHistory();

  if(session?.token == null){
    history.replace("login");
  }

  useEffect(() => {
    setIsLoaded(true);
  }, [authors])

  useEffect(() => {
      setIsLoaded(false);
      GetSubscribtionArticles(currentPage, session?.token).then(x => {
        if(x.count == 0)
          {
            setIsNoSubscriptions(true);
            return;
          }

          let newData = data;
          newData.currentPage = x.currentPage;
          if (data != undefined && data.result != undefined)
              newData.result = data.result.concat(x.result);
          else
              newData = x;
          setData(newData);

           if(authors.userDatas == undefined){
            GetSubscribtionCreators(session.token).then(z => {
              setAuthors(z);
            });
          }
        });
  }, [currentPage]);
    
  if(isLoaded || currentPage > 1){
    console.log('articles data', {data, authors});
   let authorsCards = authors.userDatas.map(x => <Carousel.Item>
     <div className="d-flex align-items-center justify-content-center">
        <CreatorCard author={x}></CreatorCard>
     </div>
     </Carousel.Item>);

    let page = data.result.map(x => <ExploreCard key={x.id} article={x} photo={ CheckPath(x.previewPhotoPath) } author={authors.userDatas.filter(a => a.id == x.authorId)[0]}></ExploreCard>)
    window.addEventListener('scroll', () => {
      const {
          scrollTop,
          scrollHeight,
          clientHeight
      } = document.documentElement;
      
      if (scrollTop + clientHeight >= scrollHeight - 350 && data.currentPage != data.pageCount) {
          console.log('end of scroll');
          if (isLoaded == true) {
              setCurrentPage(data.currentPage + 1);
          }
      }
  }, { passive: true });

    return (<>
       <div className="d-flex flex-row col-10 mt-4 pt-5 align-self-center align-items-baseline justify-content-center gap-5">
            <h4 className="fs-1 agency text-nowrap">Connected Creators</h4>
            <div className=" line-dark w-100"></div>
        </div>
        
        <div className="d-flex position-relative m-5 justify-items-center">
        <div class="row mx-auto my-auto justify-content-center col-9">
        <Carousel cols={4} rows={1} gap={0} loop scrollSnap={false} responsiveLayout={responsive}>
     {authorsCards}
    </Carousel>
       </div>
        </div>  


        <div className="d-flex flex-row col-10 mt-3 mb-3 pt-5 align-self-center align-items-baseline justify-content-center gap-5">
            <h4 className="fs-1 agency text-nowrap">New Memories</h4>
            <div className=" line-dark w-100"></div>
        </div>

        <div className="d-flex flex-column m-5 align-items-center">
          {page}
        </div>
    </>);
}
if(isNoSubscriptions){
  return (<>
  <div className="align-self-center agency fs-1 m-5 mb-0 p-5 h-100">
    <div>
    There no subscriptions to look. 
    </div>
    <div>
    Find your favorite Creators and check their memories
    </div>
  </div>
  <Link to="explore" className="align-self-center color-light m-5 btn bg-accent round-card agency fs-1 mt-0 ps-5 pe-5 p-2 opacity-button">Explore Memories</Link>
  </>)
}
return (<></>)
}


