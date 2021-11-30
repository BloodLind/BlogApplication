import {Login as loginURL, Register as registerURL} from './apiKeys'
export default class AccountService
{
    static Errors = [];
    static async Login(login,password,session)
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
    
    if(res.ok){
      const token  = (await (await res.json())).token;
      session.setSession({ "token":token});
      return true;
    } else {
      return false;
    }
}
    static async Register(login, password, email, session){
     
        var res =  await fetch(registerURL,
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              login,
              password,
              email
            })
          });
          
          if(res.ok){
            const token  = (await (await res.json())).token;
            session.setSession({ "token":token});
            this.Errors = [];
            return true;
          } else {
            let text = await res.text();
            let errors = JSON.parse(text);
            this.Errors = errors.map(x => x.description);
            return false;
          }
        }
      
}
