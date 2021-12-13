import '../../styles/site.css'
import '../../styles/default-namespace.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from "react"
import { GetArticleStats } from "../../api/blogController"

function AccountArticleCard(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState({})
    useEffect(() => {
        setIsLoaded(false)
        GetArticleStats(props.id).then(res => {
            setData(res)
        })
        setIsLoaded(true)
    }, [])

    if (isLoaded) {
        return (

            <NavLink to={'/article/' + props.article.id} className="text-decoration-none">
                <div className="card round-card account-article-card shadow d-flex flex-column card-dark-gradient-bg agency color-light parent">
                    <div className="account-article-photo" style={{
                        backgroundImage: !props?.photo ? `url(${window.location.protocol + "//" + window.location.host + "/drawable/logowhite.png"})` : `url(${props.photo})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }}>
                    </div>

                    <svg className="card-svg" width="400" height="60">
                        <defs>
                            <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="0.8" gradientUnits="objectBoundingBox">
                                <stop offset="0" stop-color="#141415" stop-opacity="0.659" />
                                <stop offset="1" stop-color="#141415" />
                            </linearGradient>
                        </defs>
                        <path d="M9232.95,1393.959c180.457-2.076,338.261-.386,450.05,16.675v42l-450.029.059" transform="translate(-9232.95 -1393.257)" fill="url(#linear-gradient)" />
                    </svg>

                    <div className="d-flex flex-column account-content">
                        <div className="fs-4 text-break p-3 pb-0 pt-0" style={{
                            position: 'relative',
                            top: '-15%',
                            height: '60px',
                            minHeight: '60px',
                            lineHeight: '30px',
                            maxHeight: '60px'
                        }}>
                            {props.article?.title}
                        </div>

                        <div className="d-flex p-3 justify-content-between align-items-end">
                            <div className="d-flex gap-3 align-items-center">
                                <img src="/drawable/view.png" className="account-card-icon"></img>
                                <div>{props.views}</div>
                            </div>
                            <div className="d-flex gap-3 align-items-center">
                                <img src="/drawable/like.png" className="account-card-icon"></img>
                                <div>{data.likesCount}</div>
                            </div>
                            <div className="d-flex gap-3 align-items-center">
                                <img src="/drawable/dislike.png" className="account-card-icon"></img>
                                <div>{data.dislikesCount}</div>
                            </div>
                            {!props.owner ? (<></>) : (
                                <div className="d-flex gap-3 align-items-center">
                                    <img src="/drawable/more.png" className="account-card-icon"></img>
                                </div>
                            )}

                        </div>
                    </div>


                </div>
            </NavLink>


        )
    }
    else
        return (<>
        </>)


}


export default AccountArticleCard