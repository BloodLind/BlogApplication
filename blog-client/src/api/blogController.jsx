<<<<<<< Updated upstream
import { GetUsers, GetArticles, GetPhotos, GetArticle, ArticleStats, SelfBlogs, SubscriptionAuthors, SubscriptionArticles, UserArticles } from './apiKeys'
=======
import { GetUsers, GetArticles, GetPhotos, GetArticle, SelfBlogs, SubscriptionAuthors, SubscriptionArticles,UploadPhoto,UploadPhotoByURL,AddArticle } from './apiKeys'
>>>>>>> Stashed changes


export async function BlogsGet(page = 1) {
    var res = fetch(GetArticles + '/page-' + page);
    return res.then(x => { return x.json() }).then(x => x);
}

export async function GetSubscribtionCreators(token) {
    var res = fetch(SubscriptionAuthors, {
        headers: {
            "Authorization": 'bearer ' + token
        }
    })
    return res.then(x => x.json()).then(x => x);
}

export async function GetUserArticles(login, page= 1){
    var res = fetch(UserArticles, {
        method:"POST", 
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            page:page,
            userLogin:login}
        )
    });
    return res.then(x => x.json()).then(x => x);
}

export async function GetSubscribtionArticles(page = 1, token) {
    var res = fetch(SubscriptionArticles + '/page-' + page,
        {
            headers: { 'Authorization': 'bearer ' + token }
        });
    return res.then(x => { return x.json() }).then(x => x);
}

export async function GetSelfBlogs(page = 1, token) {
    var res = fetch(SelfBlogs + '/page-' + page,
        {
            headers: {
                'Authorization': 'bearer ' + token
            }
        });
    return res.then(x => { return x.json() }).then(x => x);
}

export async function PhotosGet(ids) {
    var photos = [];
    console.log(ids);
    for (let id of ids) {
        if (id == null)
            continue;
        var result = await fetch(GetPhotos + `/id-${id}`);
        if (result.ok) {
            var data = await result.json();
            photos.push(data);
        }
    }

    console.log(photos);
    return photos;
}

export async function GetPhoto(id) {
    var result = await fetch(GetPhotos + `/id-${id}`);
    if (result.ok) {
        return await result.json();
    }
    else return null;
}

export async function UsersGet(ids) {
    var result = await fetch(GetUsers, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usersId: ids
        })
    });
    if (result.ok)
        return (await result.json());
    else
        return null;

}

export async function GetUser(id) {
    var result = await fetch(GetUsers, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usersId: [id]
        })
    });

    if (result.ok) {
        return (await result.json()).userDatas[0];
    }
    else
        return null;
}

export async function ArticleGet(id) {
    var result = await fetch(GetArticle + `/id-${id}`);
    if (result.ok)
        return (await result.json());
    else
        return null;
}
export async function UploadPhotoToServer(file,token) {

<<<<<<< Updated upstream
export async function GetArticleStats(articleId) {
    var result = await fetch(ArticleStats + `/id-${articleId}`);
    if (result.ok)
        return (await result.json())
    else
        return null
}

=======
    let formData = new FormData();
    formData.append("image",file);
   
    var res = fetch(UploadPhoto,
    {
        method: "POST",
        headers: {
            'Authorization': 'bearer ' + token
        },
        body: formData,
    });
    return res.then(x => { return x.json() }).then(x => x);
}
export async function UploadPhotoByUrlToServer(url,token) {
    var res = fetch(UploadPhotoByURL,
    {
        method: "POST",
        headers: {
            'Authorization': 'bearer ' + token
        },
        body: {url:url},
    });
    return res.then(x => { return x.json() }).then(x => x);
}
export async function AddArticleToServer(article,token) {
    var res = fetch(AddArticle,
    {
        method: "POST",
        headers: {
            'Authorization': 'bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(article),
    });
    return res.then(x => { return x.json() }).then(x => x);
}
>>>>>>> Stashed changes
