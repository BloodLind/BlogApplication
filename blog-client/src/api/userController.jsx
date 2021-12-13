import { Self } from "./apiKeys";

export async function GetSelf(token) {
    var res = fetch(Self,
        {
            headers: {
                'Authorization': 'bearer ' + token
            }
        });
    return res.then(x => { return x.json() }).then(x => x);
}

