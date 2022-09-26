import React  from 'react'

import { Text, Input, Spacer } from "@nextui-org/react";


const PasswordInput = () => {
  return (
    <>
        <Text> ユーザ名とパスワードを入力してください</Text>
        <Spacer y={2.6} />
        <Input clearable bordered labelPlaceholder="User name" initialValue="" />
        <Spacer y={1.6} />
        <Input.Password clearable bordered labelPlaceholder="Password" initialValue="" />
        
                
    </>
  );
}

export default PasswordInput;

