import {GetUsers, GetArticles, GetPhotos} from './apiKeys'
export async function BlogsGet(){
    var res =   fetch(GetArticles);
    return res.then(x =>{return x.json()}).then(x => x);
}

export async function PhotosGet(ids){
    var photos = [];
    ids.foreach(async x => {

        var result = await fetch(GetPhotos + `/id-${x}`);
        if(result.ok){
            var data = await result.json();
            photos.push(data);
        }
        })
        return photos.result;
    }

export async function UsersGet(ids){
    var users = [];
    
        var result = await fetch(GetUsers, {
            method : 'POST',
            body : {
                "usersId" : ids
            }
        })
        if(result.ok)
            return await result.json().result;
        else
            return undefined;

}

