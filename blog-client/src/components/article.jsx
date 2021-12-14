import 'bootstrap/dist/css/bootstrap.min.css'
import {ArticleGet, GetUser, GetPhoto} from '../api/blogController'
import { useEffect, useState } from "react";
import {Link, useParams} from 'react-router-dom'
import ArticleCard from './cards/ArticleCard'
import { CheckPath } from '../services/imageChecker';
import EditorConfig from "../services/editorJSConfig";
import EditorJS from "@editorjs/editorjs";
import "../styles/editorJSSets.css";
function Article(props){
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState({});
    const [author, setAuthor] = useState('');
    let {id} = useParams();
    useEffect(() => {
        ArticleGet(id).then(x => 
            {
                setData(x); 
                GetUser(x.authorId).then(z => { setAuthor(z[0]); setIsLoaded(true)});
               
            });
     }, [])
    if(isLoaded)
    {
        var config = EditorConfig;
        config.readOnly = true;
        config.data = JSON.parse(data.innerData)
        var editorJS = new EditorJS(config);
        return (<div className="d-flex flex-column gap-5 align-items-center align-content-center">
        <ArticleCard photo={CheckPath(data.previewPhotoPath)} author={author} article={data}></ArticleCard>
      
                <div id="editorjs" className="delete-select-border agency-headers yu-gothic fs-5 col-7 p-3 align-self-center"></div>
      
    </div>);
    } else {
        return (<></>);
    } 
}

export default Article;