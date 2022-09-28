export type User = {
    userName:string;
    password:string;
    userLevel:number;
}

let currentUser:User = {userName:"",password:"",userLevel:1,};

export const setCurrentUser = (user:User)=>{
    currentUser = user;
}

export const getCurrentUser = ():User =>{

    return currentUser;
}

export const isLoginUser = ():boolean =>{
    if(currentUser.userName.length === 0){
        return false;
    }
    return true;
}



