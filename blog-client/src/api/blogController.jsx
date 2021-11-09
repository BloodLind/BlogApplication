import {GetUsers, GetArticles, GetPhotos, GetArticle} from './apiKeys'
export async function BlogsGet(){
    var res =   fetch(GetArticles);
    return res.then(x =>{return x.json()}).then(x => x);
}


export async function PhotosGet(ids){
    var photos = [];
    console.log(ids);
    for(let id of ids){
        if(id == null)
            continue;
        var result = await fetch(GetPhotos + `/id-${id}`);
        if(result.ok){
            var data = await result.json();
            photos.push(data);
        }
    }
    
      console.log(photos);
        return photos;
    }

    export async function GetPhoto(id){
        var result = await fetch(GetPhotos + `/id-${id}`);
        if(result.ok){
            return await result.json();
        }
        else return null;
    }

export async function UsersGet(ids){
        var result = await fetch(GetUsers, {
            method : 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({usersId : ids
            })
        });
        if(result.ok)
            return (await result.json());
        else
            return null;

}

export async function GetUser(id){
    var result = await fetch(GetUsers, {
        method : 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({usersId : [id]
        })
    });

    if(result.ok)
    {
        return (await result.json()).userDatas;
}
    else
        return null;
}

export async function ArticleGet(id){
    var result = await fetch(GetArticle + `/id-${id}`);
    if(result.ok)
        return (await result.json());
    else
        return null;
}

