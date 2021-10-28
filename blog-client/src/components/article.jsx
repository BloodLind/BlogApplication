import 'bootstrap/dist/css/bootstrap.min.css'
import {BlogsGet, UsersGet, PhotosGet} from '../api/blogController'
import { useEffect, useState } from "react";
import '../styles/site.css'
import {Link} from 'react-router-dom'
import ArticleCard from './cards/ArticleCard'

function Article(props){
    const [data, setData] = useState({});
     const [photo, setPhoto] = useState([]);
     const [author, setAuthor] = useState([]);
     
    return (<div className="d-flex flex-column gap-5 align-items-center">
<ArticleCard></ArticleCard>
    </div>);
}

export default Article;