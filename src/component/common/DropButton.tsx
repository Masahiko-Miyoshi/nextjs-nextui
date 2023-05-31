import React,{Key} from 'react';
import { Dropdown,Navbar } from "@nextui-org/react";
import InteractiveMap from 'react-map-gl';


interface MenuItem {
  key: string;
  title: string;
  discription: string;
  icon?: JSX.Element;
  func: ()=>void;
}

interface DropdownButtonProps {
  isDark?:boolean
  title:string;
  menuItems: MenuItem[];
}


export const DropdownButton: React.FC<DropdownButtonProps> = (props) => {

  const {isDark,title,menuItems} = props;
  const handleAction = (key:Key) : void =>{ 
    const menuItem = menuItems.find((item)=>item.key==key)
    menuItem?.func();
  }  

  

  return (
    <Dropdown isBordered>
      
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
      >{title}</Dropdown.Button>
      <Dropdown.Menu aria-label="Dynamic Actions" onAction={handleAction}>
        {menuItems.map(item => (
          <Dropdown.Item key={item.key} 
            showFullDescription
            description={item.discription}
            icon={item.icon}>
            {item.title}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
      
    </Dropdown>
  );
}