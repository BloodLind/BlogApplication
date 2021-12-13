import '../styles/default-namespace.jsx'
import '../styles/site.css'
import useSession from 'react-session-hook'
import { useState, useEffect } from "react"
import AccountArticleCard from './cards/AccountArticleCard'
import { useHistory, Link } from 'react-router-dom'
import { CheckPath } from '../services/imageChecker'
import { GetUser, GetSelfBlogs } from '../api/blogController'
import { GetSelf, GetSubsctiptionAuthors, GetSubscribersCount } from '../api/userController.jsx'

export default function AccountSelf() {
    const session = useSession()
    const [subToCount, setSubToCount] = useState(0)
    const [subsribers, setSubscribers] = useState(0)
    const [data, setData] = useState({})
    const [user, setUser] = useState(undefined)
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        setIsLoaded(false);
        GetSelf(session.token).then(res => {
            var tmp = res
            if (!tmp) {
                return
            }
            GetSubscribersCount(tmp.id).then(res=>{
                setSubscribers(res)
            })
            GetSubsctiptionAuthors(session.token).then(res => {
                setSubToCount(res.count)
            })
            GetUser(tmp.id).then(x => {
                console.log(x)
                setUser(x[0])
            })
            

        })


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
        let articleCards = undefined;
        if (data.count > 0) {
            articleCards = data.result.map(x => <AccountArticleCard owner={true} key={x.id} id={x.id} views={x.viewsCount} article={x} photo={CheckPath(x.previewPhotoPath)}></AccountArticleCard>)
            window.addEventListener('scroll', () => {

                const {
                    scrollTop,
                    scrollHeight,
                    clientHeight
                } = document.documentElement;
                if (scrollTop + clientHeight >= scrollHeight - 350 && data.currentPage != data.pageCount) {
                    console.log('end of scroll');
                    if (isLoaded == true) 
                        setCurrentPage(data.currentPage + 1);
                }
            }, { passive: true });
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
                                    Welcome, {user?.name}
                                </div>
                                <div className="d-flex gap-5 fs-4">
                                    <div>
                                        {!articleCards?.length ? 0 : articleCards.length} publications
                                    </div>
                                    <div>
                                        {subsribers} subscribers
                                    </div>
                                    <div>
                                        {subToCount} subscriptions
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex gap-3 flex-grow-1 justify-content-end">
                                <button className="btn bg-accent fs-4 agency ps-5 pe-5 text-nowrap" type="button">Edit Profile</button>
                                <button className="btn bg-accent fs-4 agency ps-5 pe-5 text-nowrap" type="button">Creative Lab</button>
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
                                    <h3 className="agency text-super-x-larger" >Have not found your articles?<br></br>Come on and create new one</h3>

                                    <Link to="/create" className="btn col-8 opacity-button bg-accent agency fs-2 color-light mt-0 mb-0 round-button">Create new memory</Link>
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

