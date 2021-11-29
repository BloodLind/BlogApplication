import '../styles/default-namespace.jsx'
import '../styles/site.css'

import useSession from 'react-session-hook'

export default function Account(){
    const session = useSession();
    return (
    <div className="d-flex flex-wrap text-wrap overflow-hidden">
    Your token is {session.token}
    </div>)
}