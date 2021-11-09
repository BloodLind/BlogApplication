import 'bootstrap/dist/css/bootstrap.min.css'
import {ArticleGet, GetUser, GetPhoto} from '../api/blogController'
import { useEffect, useState } from "react";
import {Link, useParams} from 'react-router-dom'
import ArticleCard from './cards/ArticleCard'

function Article(props){
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState({});
    const [photo, setPhoto] = useState('');
    const [author, setAuthor] = useState('');
    let {id} = useParams();
    useEffect(() => {
        ArticleGet(id).then(x => 
            {
                setData(x); 
                GetPhoto(x.previewPhotoId).then(p => {
                    setPhoto(p);
                    GetUser(x.authorId).then(z => { setAuthor(z[0]); setIsLoaded(true)})
                })
            });
     }, [])
    if(isLoaded)
    {
        return (<div className="d-flex flex-column gap-5 align-items-center">
        <ArticleCard photo={photo} author={author} article={data}></ArticleCard>
        <div className="p-5 m-2 ms-5 me-5 mt-0">
            <p className="agency text-x-large m-5 mt-0 p-5">
                {data.innerData}
            </p>
        </div>
    </div>);
    } else {
        return (<></>);
    } 
}

export default Article;