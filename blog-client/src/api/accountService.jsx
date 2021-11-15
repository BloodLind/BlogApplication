import {Login as loginURL} from './apiKeys'
export default class AccountService
{
      static async  Login(login,password,session)
    {
        var res =  await fetch(loginURL,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
               
              },
            body: JSON.stringify({
                login,
                password
              })
        });
    
    
        const token  = (await (await res.json())).token;
        session.setSession({ "token":token});
    }
}
