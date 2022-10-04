import React,{useState}  from 'react';
import { useRouter } from 'next/router';
import type { GetStaticProps, NextPage } from 'next';

import { Row,Card, Popover, Button, Text, Input, Spacer, Grid } from "@nextui-org/react";
import confetti from 'canvas-confetti';
import {setCurrentUser} from '@/users/currentUser';
import { isAcceptable,getEntryUsers } from '@/users/usersInfo';
import type {User}  from '@/users/currentUser';


type Props = {
  entryUsers:User[];
}

let userName:string = "";
let password:string = "";

const PasswordInput = (props?:Props) =>  {
    
  const [logInMessage,setLoginMessage] = useState<string>("");
  const router = useRouter();

  
 

  const handleClick = () => {
    const user = isAcceptable(userName,password);
    console.log("user:" + user);
    if(user !== null){
      confetti();
      setCurrentUser(user);
      setLoginMessage("Correct !");
      router.push("./");
    }
    else{
      setLoginMessage("Inncorrect ! please retry.");
    }
  };  
  const handleUsername = (event:any):void => {
    userName = event.target.value; 
    console.log("AAAAA");
    
  };  
  const handlePassword = (event:any):void => {
    password = event.target.value;
    console.log("BBBBBB");
  };  
 
  return (
    <Card css={{ mw: "600px",mx:"auto",mt:"150px",}} variant={'shadow'}>
        <Card.Header>
          <Text css={{ textGradient: "45deg, $blue500 -30%, $red500 100%" }} size={20} weight="bold">Input user name and password.</Text>
        </Card.Header>
        <Card.Divider />
        <Spacer y={1.6} />
        <Card.Body css={{ py: "$10" }}>
          
            <Input clearable bordered labelPlaceholder="User name" initialValue={userName} onChange = {handleUsername}/>
            <Spacer y={1.6} />
            <Input.Password clearable bordered labelPlaceholder="Password" initialValue={password} onChange ={handlePassword}/>
            <Spacer y={1.6} />
            
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
        <Text css = {{width:"100%"}} size={20} weight="bold" color="red" >{logInMessage}</Text>
          <Row justify="flex-end">
          <Button
                auto
                rounded
                ripple={false}
                size="xl"
                onPress={handleClick}
                css={{
                    background: 'pink',
                    fontWeight: '$semibold',
                    boxShadow: '$md',
                    position: 'relative',
                    overflow: 'visible',
                    // color: '#0F9549',
                    color: 'blue',
                    px: '$10',
                    '&:after': {
                    content: '""',
                    position: 'absolute',

                    width: '100%',
                    height: '100%',
                    background: '$whilte',
                    opacity: 0.5,
                    borderRadius: '$pill',
                    transition: 'all 0.4s ease'
                    },
                    '&:hover': {
                    transform: 'translateY(-5px)',
                    '&:after': {
                        transform: 'scaleX(1.5) scaleY(1.6)',
                        opacity: 0.5
                    }
                    },
                    '&:active': {
                    transform: 'translateY(-10px)'
                    }
                }}
                >
                Sign in
            </Button>
            
          </Row>
        </Card.Footer>
      </Card>
  


    
  );
}


export const getStaticProps: GetStaticProps<Props> = async () => {
  console.log("Login ISR running !!!\n");
  return {
    props: {
      entryUsers: getEntryUsers(),
    },
    // revalidate: 1,
  };
};


PasswordInput.getLayout = (page:React.ReactNode) => {
  console.log("Excute login. ")
  return( 
  <div className="global-layout">
    {page}
  </div>
  )
};


export default PasswordInput;

