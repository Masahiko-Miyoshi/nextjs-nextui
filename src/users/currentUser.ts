export type User = {
    userName:string;
    password:string;
    userLevel:number;
};

const key = 'UserInfoKey';

export const setCurrentUser = (currentUser:User)=>{
    
    const val = JSON.stringify(currentUser);
    window.sessionStorage.setItem(key, val);
}

export const getCurrentUser = ():User|null =>{

    const str = window.sessionStorage.getItem(key);
    
    if(str != null){
        const user:User = JSON.parse(str);
        console.log("User name %s",user.userName);
        return user;
    }
    console.log("User name null");
    return null;  
}

export const isLoginUser = ():boolean =>{
    const currentUser = getCurrentUser();
    if(!currentUser){
        return false;
    }
    if(currentUser.userName.length === 0){
        return false;
    }
    return true;
}



