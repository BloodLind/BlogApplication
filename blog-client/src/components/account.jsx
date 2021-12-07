import '../styles/default-namespace.jsx'
import '../styles/site.css'
import useSession from 'react-session-hook'
import AccountArticleCard from './cards/AccountArticleCard'

export default function Account() {
    const session = useSession();
    if (session.token == undefined) {

    } else {
        return (
            // <div className="d-flex flex-wrap text-wrap overflow-hidden">
            //     Your token is {session.token}
            // </div>
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
                                    Welcome, Floppa
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
                                <button className="btn bg-accent fs-4 agency ps-5 pe-5 text-nowrap" type="button">Creative Lab</button>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex container align-items-baseline gap-5">
                        <h4 className="text-super-xx-large agency text-nowrap">Your Memories</h4>
                        <div className=" line-dark flex-grow-1"></div>
                    </div>

                    <div className="d-flex container justify-content-between flex-wrap gap-5 mb-5">
                        <AccountArticleCard></AccountArticleCard>
                        <AccountArticleCard></AccountArticleCard>
                        <AccountArticleCard></AccountArticleCard>
                        <AccountArticleCard></AccountArticleCard>
                    </div>
                </div>
            </div>
        )
    }

}