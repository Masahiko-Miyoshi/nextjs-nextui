import React from 'react';
import { Modal, Button, Text, Input, Row, Checkbox, gray, grayDark } from "@nextui-org/react";


export type ModalAddUserProps = {
  show:boolean;
  handleModalClose: ()=>void;
}

export const ModalAddUser = (Props:ModalAddUserProps) => {

  let {show,handleModalClose} = Props;
  return(
    <>
      <Modal
      closeButton
      aria-labelledby="modal-title"
      open={show}
      onClose={handleModalClose}
      css={{backgroundColor:'$gray200'}}
      >
      <Modal.Header>
        <Text id="modal-title" size={18} color="primary">
            新規ユーザーの登録
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          label="名前"
          
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          label="ロール"
         
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          label="メールアドレス"
          
        />

        
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={handleModalClose}>
          OK
        </Button>
        <Button auto onPress={handleModalClose}>
          キャンセル
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}