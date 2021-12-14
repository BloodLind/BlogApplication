import { GetUser, GetUserArticles } from '../api/blogController'
import { CheckOwnSubscribtion,GetSubscribersCount, SubscribeToCreator, UnsubscribeToCreator } from '../api/userController.jsx'
import { CheckPath } from '../services/imageChecker'
import numberFormat from '../services/numbersFormater'
import { Link } from 'react-router-dom'

import '../styles/default-namespace.jsx'
import '../styles/site.css'
import useSession from 'react-session-hook'
import AccountArticleCard from './cards/AccountArticleCard'
import { useParams } from 'react-router';
import { useState, useEffect} from 'react';


export default function Account(props) {
    const session = useSession();
    let {id} = useParams();
    const [subsribers, setSubscribers] = useState(0);
    const [data, setData] = useState({});
    const [user, setUser] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState();

    const onClick = function (){
        if(isSubscribed){
            UnsubscribeToCreator(id, session.token).then(x => setIsSubscribed(false));
        } else {
            SubscribeToCreator(id, session.token).then(x => setIsSubscribed(true));
        }
    }

    useEffect(() => {
        setIsLoaded(false);
            GetSubscribersCount(id).then(res=>{
                setSubscribers(res)
            });

            if(session.token){
                CheckOwnSubscribtion(id, session.token).then(x => setIsSubscribed(x.isSubscribe));
            }
            GetUser(id).then(x => {
                setUser(x);

                console.log(x);
                GetUserArticles(x.name,currentPage).then(res => {
                    if (!res) {
                        return;
                    }
                    console.log(res);
                    let newData = data;
                    newData.currentPage = res.currentPage;
                    if (data != undefined && data.result != undefined)
                        newData.result = data.result.concat(res.result);
                    else
                        newData = res;
                    setData(newData);
                    setIsLoaded(true)   })
                })
            
    }, [currentPage]);


    if (isLoaded || currentPage > 1) {
        let articleCards = undefined;
        if (data.count > 0) {
            articleCards = data.result.map(x => <AccountArticleCard owner={false} key={x.id} views={x.viewsCount} article={x} photo={CheckPath(x.previewPhotoPath)}></AccountArticleCard>)
            if(currentPage === 1)
            {

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
    }



        return (

            <div className="d-flex flex-column">
                <div className="account-back">
                    <img className="account-img-back"
                        src={user?.profilePhoto ? user?.profilePhoto : `${window.location.protocol}//${window.location.host}/drawable/loadimageprev.png`}
                        style={{ objectFit: 'cover' }}></img>
                </div>
                <div className="d-flex flex-column">
                    <div className="container agency mb-5">
                        <div className="d-flex gap-5 align-items-center">
                            <div className="account-ava" style={{backgroundColor : 'white'}}>
                                <img className="w-100 h-100 account-ava-img shadow"
                                    src={user?.photo ? user?.photo : `${window.location.protocol}//${window.location.host}/drawable/logoblack.png`}
                                    style={{ objectFit: 'cover' }}></img>
                            </div>
                            <div className="d-flex flex-column gap-3">
                                <div className="text-super-x-larger">
                                    {user?.name}
                                </div>
                                <div className="d-flex gap-5 fs-4">
                                    <div>
                                        {!articleCards?.length ? 0 : numberFormat(articleCards.length)} publications
                                    </div>
                                    <div>
                                        {numberFormat(subsribers)} subscribers
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex gap-3 flex-grow-1 justify-content-end">
                                <button onClick={onClick} className="btn bg-accent fs-4 agency ps-5 pe-5 text-nowrap opacity-button" type="button">{isSubscribed ? "Unsubscribe" : "Subscribe"}</button>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex container align-items-baseline gap-5">
                        <h4 className="fs-1 agency text-nowrap">Your Memories</h4>
                        <div className=" line-dark flex-grow-1"></div>
                    </div>

                    <div className="d-flex container justify-content-between flex-wrap gap-5 mb-5">

                        {!articleCards ? ( 
                            <div className="d-flex flex-row m-5 color-dark align-items-center justify-content-around" style={{
                                height: '450px',
                            }}>
                                <div className="ocr m-5" style={{
                                    fontSize: '27em'
                                }}>?</div>

                                <div className="d-flex flex-column gap-5 ">
                                    <h3 className="agency text-super-x-larger" >I seems the creator has no memories<br></br>Maybe, it is worth looking for other creators</h3>

                                    <Link to="/explore" className="btn col-8 opacity-button bg-accent agency fs-2 color-light mt-0 mb-0 round-button">Explore Memories</Link>
                                </div>
                            </div>
                        ) : articleCards}

                    </div>
                </div>
            </div>
        )


    } else {
        return (<>
        </>)
    }
}