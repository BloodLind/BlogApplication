import '../styles/default-namespace.jsx'
import '../styles/site.css'
import useSession from 'react-session-hook'
import { useState, useEffect } from "react"
import AccountArticleCard from './cards/AccountArticleCard'
import { useHistory, Link } from 'react-router-dom'
import { CheckPath } from '../services/imageChecker'
import { GetUser, GetSelfBlogs } from '../api/blogController'

export default function AccountSelf() {
    const session = useSession()
    const [data, setData] = useState({});
    const [author, setAuthor] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);
    console.log(session.token)
    useEffect(() => {
        setIsLoaded(false);
        GetSelfBlogs(currentPage, session.token).then(res => {
            console.log(res)
            if (!res) {
                return;
            }
            let newData = data;
            newData.currentPage = res.currentPage;
            if (data != undefined && data.result != undefined)
                newData.result = data.result.concat(res.result);
            else
                newData = res;
            setData(newData);

            setIsLoaded(true)
        })
    }, [currentPage])

    if (isLoaded || currentPage > 1) {
        console.log(data.count)
        let articleCards = undefined;
        if (data.count > 0) {
            articleCards = data.result.map(x => <AccountArticleCard key={x.id} article={x} photo={CheckPath(x.previewPhotoPath)}></AccountArticleCard>)
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
        }



        return (

            <div className="d-flex flex-column">
                <div className="account-back">
                    <img className="account-img-back" src="https://wallpapercave.com/wp/wp2555730.jpg"></img>
                </div>
                <div className="d-flex flex-column">
                    <div className="container agency mb-5">
                        <div className="d-flex gap-5 align-items-center">
                            <div className="account-ava">
                                <img className="w-100 h-100 account-ava-img shadow" src="https://yt3.ggpht.com/ytc/AKedOLTAEe1oXRGuXZ7Df6olWXUyEuXvrawJBftMJ8kgDA=s900-c-k-c0x00ffffff-no-rj"></img>
                            </div>
                            <div className="d-flex flex-column gap-3">
                                <div className="text-super-x-larger">
                                    Floppa
                                </div>
                                <div className="d-flex gap-5 fs-4">
                                    <div>
                                        3 publications
                                    </div>
                                    <div>
                                        4k subscribers
                                    </div>
                                    <div>
                                        5 subscriptions
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex gap-3 flex-grow-1 justify-content-end">
                                <button className="btn bg-accent fs-4 agency ps-5 pe-5 text-nowrap" type="button">Edit Profile</button>
                                <button className="btn bg-accent fs-4 agency ps-5 pe-5 text-nowrap" type="button">Subscribe</button>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex container align-items-baseline gap-5">
                        <h4 className="text-super-xx-large agency text-nowrap">Your Memories</h4>
                        <div className=" line-dark flex-grow-1"></div>
                    </div>

                    <div className="d-flex container justify-content-between flex-wrap gap-5 mb-5">

                        {!articleCards ? (<div className="agency, ">
                            <p className="text-x-large">
                                Nothing is here? Try to create something!
                            </p>
                            <button className="btn bg-accent fs-4 agency ps-5 pe-5 text-nowrap" type="button">Create</button>
                        </div>) : articleCards}

                    </div>
                </div>
            </div>
        )


    } else {
        return (<>
        </>)
    }


}

