import React,{Key} from "react";
import { Grid,Navbar, Text, Switch, Dropdown, Button } from "@nextui-org/react";
import { useTheme as useNextTheme } from 'next-themes';
import { useTheme } from '@nextui-org/react';
import {Logo} from '@/component/common/Logo';
import {DropdownButton} from '@/component/common/DropButton';
import NextLink from 'next/link'
import confetti from 'canvas-confetti';


type MenuItemType = "nav" | "dropdown";

type NavItem = {
  itemType: MenuItemType;
  title: string;
  to: string;
  func?: ()=>void
}

type ChildItem = {
  key: string;
  title: string;
  discription: string;
  icon?: JSX.Element;
  func: ()=>void;

}

type DropdownItem = {
  itemType: MenuItemType;
  title: string;
  childrenItem:ChildItem[];
} 

export type HeaderMenuProps = NavItem | DropdownItem;


type DefineHandler ={
  key: string;
  func: ()=>void
} 

let handlerTable: DefineHandler[] = new Array();

const handleAction = (key:Key) : void =>{
  const defHandler = handlerTable.find((item)=>item.key==key)
  defHandler?.func();

}


type DropdownChildItemProps = {
  item:HeaderMenuProps;
}


const DropdownChildItem:React.FC<DropdownChildItemProps> = (props) =>{
  const {item} = props;
  handlerTable.splice(0);
  return(
    <Dropdown.Menu
      color="secondary"
      aria-label="ACME features"
      onAction={handleAction}
      css={{
        $$dropdownMenuWidth: "340px",
        $$dropdownItemHeight: "70px",
        "& .nextui-dropdown-item": {
          py: "$4",
          // dropdown item left icon
          svg: {
            color: "$secondary",
            mr: "$4",
          },
          // dropdown item title
          "& .nextui-dropdown-item-content": {
            w: "100%",
            fontWeight: "$semibold",
          },
        },
      }}
    >
    {
      
      (item as DropdownItem).childrenItem.map((child)=>{
        handlerTable.push({key:child.key, func:child.func})
        return(
        <Dropdown.Item
          key={child.key}
          showFullDescription
          description={child.discription}
          icon={child.icon}
        >
          {child.title}
        </Dropdown.Item>
        )
      })
    }
    </Dropdown.Menu>
  )
}


type NavbarItemProps = {
  item:HeaderMenuProps;
  isDark:boolean|undefined;
}


const NavbarItem:React.FC<NavbarItemProps> = (props) =>{
  const {item,isDark} = props;
  
  
  if(item.itemType === "nav"){
      if((item as NavItem).to){
        const linkTo = (item as NavItem).to;
        let internalLink = true;
        if(linkTo.includes("https")) internalLink=false;
        
        return (
            <NextLink href={linkTo}  >
             {
              // Use onClick handler instead of onPress to escape startup warning
               internalLink ?
                 <Navbar.Link  href = {linkTo} onClick={(e:any)=>{confetti()}} color={isDark?"warning":"inherit"}  >{item.title}</Navbar.Link> :
                 <Navbar.Link  target="_blank" href = {linkTo} onClick={(e:any)=>{confetti()}} color={isDark?"warning":"inherit"}  >{item.title}</Navbar.Link>
             }
            
            {/* <Navbar.Link   href = {linkTo} color={isDark?"warning":"inherit"}  >{item.title}</Navbar.Link> */}
            </NextLink>
        )
      }
      else{
        return(
          <Navbar.Link   onPress={(item as NavItem).func} color={isDark?"warning":"inherit"}  >{item.title}</Navbar.Link>
        )
      }
    }
  else if(item.itemType==="dropdown"){
    return(
      
      <Dropdown isBordered>
        <Navbar.Item  >
          <Dropdown.Button
            color= {isDark ? 'warning' :'default'}
            auto
            size={"xs"}
            light
            css={{
              px: 0,
              dflex: "center",
              svg: { pe: "none" },
            }}
            ripple={false}
            // iconRight={icons.chevron}
          >
            {item.title}
          </Dropdown.Button>
        </Navbar.Item>
        
        <DropdownChildItem item ={item}/>
      </Dropdown>
      
    )
  }
  else{
      console.log("Invalid itemType !!!")
      return null;
  }
}


type Props = {
  headerMenuProps: HeaderMenuProps[];
}

export const HeaderMenu :React.FC<Props> = (props) =>{
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

 
  return (
    <Navbar   shouldHideOnScroll  isBordered variant={"sticky"} maxWidth={"fluid"} css={{opacity: "0.9",backgroundColor:"#476bef",width:"100%"}}>
      <Navbar.Toggle showIn="xs" hideIn="sm" />
      <Navbar.Brand
          css={{
              "@xs": {
              w: "12%",
              },
          }}
      >
       <Grid.Container gap={0} justify="center"  >
          <Grid xl={6} xs={6}>
            <Logo/>
          </Grid>
          <Grid xl={6} xs={6}>
            <Text b 
             size={12}
             css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
               mt:40,
             }}
             weight="bold"
             hideIn="sm">
              Otsuka electronics Co,ltd.
            </Text>
          </Grid>
          

        
       </Grid.Container>
        
      </Navbar.Brand>
      {/* <Navbar.Content   enableCursorHighlight activeColor="secondary" hideIn="xs" variant="highlight"> */}
      <Navbar.Content   enableCursorHighlight activeColor="secondary" hideIn="xs" variant="underline">
    
        {props.headerMenuProps.map((item,index) =>{
            return <NavbarItem  key={index}  item={item} isDark={isDark} />
         })
        }
      </Navbar.Content>

      <Navbar.Content
            css={{
              "@xs": {
                w: "12%",
                jc: "flex-end",
              },
            }}
          >
            <Text size={20} b > {type} </Text>
            <Switch shadow color="warning"
              checked={isDark}
              onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
              css ={{paddingLeft:"0px"}}
            />

      </Navbar.Content>
    </Navbar>       
  )
}

