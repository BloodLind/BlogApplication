import { Self, SubscriptionAuthors, SubscribersCount, CheckSubscribtion, Subscribe, Unsubscribe } from "./apiKeys";

export async function GetSelf(token) {
    var res = fetch(Self,
        {
            headers: {
                'Authorization': 'bearer ' + token
            }
        });
    return res.then(x => { return x.json() }).then(x => x);
}

export async function GetSubsctiptionAuthors(token) {
    var res = fetch(SubscriptionAuthors,
        {
            headers: {
                'Authorization': 'bearer ' + token
            }
        });
    return res.then(x => { return x.json() }).then(x => x);
}

export async function GetSubscribersCount(id){
    var res = fetch(SubscribersCount + `/id-${id}`)
    return res.then(x => { return x.json() }).then(x => x);
}

export async function CheckOwnSubscribtion(id,token){
    var res = fetch(CheckSubscribtion + `/id-${id}`, {
        headers:{
            'Authorization': 'bearer ' + token
        }
    })
    return res.then(x => x.json()).then(x => x);
}


export async function SubscribeToCreator(id, token){
    var res = fetch (Subscribe, {
        method:"POST",
        headers:{
            'Authorization': 'bearer ' + token,
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(id)
    });
    return  res.then(x => x.json()).then(x => x);
}

export async function UnsubscribeToCreator(id, token){
    var res = fetch (Unsubscribe, {
        method:"POST",
        headers:{
            'Authorization': 'bearer ' + token,
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(id)
    });
    return  res.then(x => x.json()).then(x => x);
}

