
import type { NextPage,GetStaticProps } from 'next'
import {Link,Button,Navbar,Text,Grid,Table} from '@nextui-org/react';
import styles from '@/styles/Home.module.css';
import {ModalAddUser} from  '@/component/app/ModalAddUser';
import { Key, useState } from 'react'
import confetti from 'canvas-confetti';

type SettingStaticProps = {
    dummy:string;
}

type UserInfo = {
  key: string,
  name: string,
  role: string,
  email: string,

}


export const Setting:NextPage<SettingStaticProps> = (props)=>{

const [showModalAddUser, setShowModalAddUser] = useState(false);


  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "role",
      label: "Role",
    },
    {
      key: "email",
      label: "E-mail",
    },
  ];
  const rows: UserInfo[] = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "Level1",
      email: "absd@gmail.com",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Level1",
      email: "absd@gmail.com",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Level1",
      email: "absd@gmail.com",
    },
    {
      key: "4",
      name: "William Howard",
      role: "Level1",
      email: "absd@gmail.com",
    },
    {
      key: "5",
      name: "Tony Reichert",
      role: "Level1",
      email: "absd@gmail.com",
    },
    {
      key: "6",
      name: "Zoey Lang",
      role: "Level1",
      email: "absd@gmail.com",
    },
    {
      key: "7",
      name: "Jane Fisher",
      role: "Level1",
      email: "absd@gmail.com",
    },
    {
      key: "8",
      name: "William Howard",
      role: "Level1",
      email: "absd@gmail.com",
    },
    {
      key: "9",
      name: "Tony Reichert",
      role: "Level1",
      email: "absd@gmail.com",
    },
    {
      key: "10",
      name: "Zoey Lang",
      role: "Level1",
      email: "absd@gmail.com",
    },
    {
      key: "11",
      name: "Jane Fisher",
      role: "Level1",
      email: "absd@gmail.com",
    },
    {
      key: "12",
      name: "William Howard",
      role: "Level1",
      email: "absd@gmail.com",
    },
    {
      key: "13",
      name: "Tony Reichert",
      role: "Level1",
      email: "absd@gmail.com",
    },
    {
      key: "14",
      name: "Zoey Lang",
      role: "Level1",
      email: "absd@gmail.com",
    },
    {
      key: "15",
      name: "Jane Fisher",
      role: "Level1",
      email: "absd@gmail.com",
    },
    {
      key: "16",
      name: "William Howard",
      role: "Level1",
      email: "Vacatabsd@gmail.comion",
    },
  ];
  const handleTest = (keys:any)=>{
    console.log(keys.anchorKey)
    console.log(keys.currentKey)
    console.table({keys})
    console.log(keys)
  }

  const handleAddUser = ()=>{
    setShowModalAddUser(true);      
  }

  const handleModalAddUserClose = ()=>{
    setShowModalAddUser(false);  
    confetti();
  }


    return(

      <>
      <Navbar isBordered variant="sticky" maxWidth={"fluid"}  >
        <Navbar.Content hideIn="xs">
          <Navbar.Item>
            <Button auto ghost onPress={handleAddUser}>
              追加
            </Button>
          </Navbar.Item>
          <Navbar.Item>
            <Button auto ghost  >
              編集
            </Button>
          </Navbar.Item>
          <Navbar.Item>
            <Button auto ghost >
              削除
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>

      <div className={styles.container}>
        {/* <main className={styles.main}> */}
        <main>
          <Grid.Container
          gap={2}
          justify="center"
          alignItems="center"
          css={{ maxW:2000, marginTop:0 }}
          >
            <Text 
              h2
              css={{ textGradient: "180deg, $purple500 20%, $pink500 100%" }}
            > ユーザー設定</Text>
            <Grid xs={12} md={12} justify="center">

              <Table
              bordered
              aria-label="Example dynamic collection table with color selection"
              color="primary"
              striped
              selectionMode="multiple"
              // defaultSelectedKeys={["2"]}
              containerCss={{
                  height: "auto",
                  minWidth: "100%",
                  backgroundColor:"$gray500"
              }}
              onSelectionChange={handleTest}
              >
                <Table.Header columns={columns}>
                    {(column) => (
                    <Table.Column key={column.key}>{column.label}</Table.Column>
                    )}
                </Table.Header>
                <Table.Body items={rows}>
                    {(item) => (
                    <Table.Row key={item.key}>
                        {(columnKey) => <Table.Cell>{item[columnKey as keyof UserInfo]}</Table.Cell>}
                    </Table.Row>
                    )}
                </Table.Body>
              </Table>
            </Grid>
            </Grid.Container>
            <ModalAddUser show={showModalAddUser}  handleModalClose={handleModalAddUserClose} />
        </main>
      </div>
      </>
      
    )




}




export const getStaticProps: GetStaticProps<SettingStaticProps> = async () => {
    console.log("ChatBot SSG running !!!\n");
    return {
      props: {
        dummy: "dummy",
      },
      // revalidate: 1,
    };
  }
  
  
  export default Setting;
  