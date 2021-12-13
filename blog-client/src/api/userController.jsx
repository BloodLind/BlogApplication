import { Self, SubscriptionAuthors, SubscribersCount } from "./apiKeys";

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

