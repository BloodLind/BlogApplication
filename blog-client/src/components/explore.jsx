import 'bootstrap/dist/css/bootstrap.min.css'
import { BlogsGet, UsersGet, PhotosGet } from '../api/blogController'
import { useEffect, useState } from "react";
import '../styles/site.css'
import '../styles/default-namespace.jsx'
import ExploreCard from './cards/ExploreCard'
import {GetPhotos} from '../api/apiKeys'
import { CheckPath } from '../services/imageChecker';

export default function Explore() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState({});
    const [authors, setAuthors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        setIsLoaded(false);
        BlogsGet(currentPage).then(x => {
            let newData = data;
            newData.currentPage = x.currentPage;
            if (data != undefined && data.result != undefined)
                newData.result = data.result.concat(x.result);
            else
                newData = x;
            setData(newData);

           
               

                UsersGet(x.result.map(a => a.authorId)).then(z => {
                    let newAuthors = authors;
                    if (authors != undefined && authors.userDatas != undefined)
                        newAuthors.userDatas = authors.userDatas.concat(z.userDatas);
                    else
                        newAuthors = z;
                    setAuthors(newAuthors);
                    setIsLoaded(true)
                })
           
        });
    }, [currentPage]);
    if (isLoaded || currentPage > 1) {
        let page = data.result.map(x =>
            <ExploreCard key={x.id} article={x} photo={ CheckPath(x.previewPhotoPath) } author={authors.userDatas.filter(a => a.id == x.authorId)[0]}></ExploreCard>)
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
        <div className="d-flex flex-row col-10 mt-5 pt-5 align-self-center align-items-baseline justify-content-center gap-5">
                    <h4 className="fs-1 agency text-nowrap">Today Creators</h4>
                    <div className=" line-dark w-75"></div>
                </div>
            <div className="d-flex flex-column justify-items-center align-items-center mt-3 pt-5 mb-5 pb-5">
                {page}
            </div>
        </>);
    } else {
        return (<></>);
    }
}