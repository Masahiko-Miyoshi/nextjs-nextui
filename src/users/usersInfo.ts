import type {User} from '@/users/currentUser';

var entryUsers:User[] =[
    {userName:"miyoshi", password:"otsuka",userLevel:1   },
];

export const addEntryUsers = (user:User) =>{
    entryUsers.push(user);
}

export const deleteEntryUsers = (user:User) =>{
    entryUsers.forEach((item, index) =>{
        if(item.userName === user.userName){
            entryUsers.splice(index,1);
        }
    });
}

export const getEntryUsers = () =>{

    return entryUsers;
}

export const isAcceptable = (userName:string, password:string) =>{
    
    for(let item of entryUsers ){
        console.log("name:%s pss:%s name2:%s pass2:%s",userName,password,item.userName,item.password);
        
        if((item.userName === userName) && (item.password === password)){
            return item;
        }
    }
    console.log("OK4");
    return null;
}
