import React from 'react';
import { Navbar, Text, Switch } from "@nextui-org/react";
import { useTheme as useNextTheme } from 'next-themes'
import { useTheme } from '@nextui-org/react'

// type Props = {
//     className?: string;
//   };
  



// export const Header: React.FC = () => {
   
//   const collapseItems = [
//     "Profile",
//     "Dashboard",
//     "Activity",
//     "Analytics",
//     "System",
//     "Deployments",
//     "My Settings",
//     "Team Settings",
//     "Help & Feedback",
//     "Log Out",
//   ];

//     return (
//       // <div>
//       <Navbar shouldHideOnScroll isBordered variant={"sticky"} maxWidth={"xl"} 
//       css={{opacity: "0.9",}}>
//         <Navbar.Toggle showIn="xs" />
//         <Navbar.Brand
//           css={{
//             "@xs": {
//               w: "12%",
//             },
//           }}
//         >
//           <Text b color="inherit" hideIn="xs">
//             Otsuka electronics Co,ltd.
//           </Text>
//         </Navbar.Brand>
//         <Navbar.Content
//           enableCursorHighlight
//           activeColor="secondary"
//           hideIn="xs"
//           variant="highlight-rounded"
//         >
//           <Navbar.Link isActive href="#">Features</Navbar.Link>
//           <Navbar.Link  href="#">
//             Customers
//           </Navbar.Link>
//           <Navbar.Link href="#">Pricing</Navbar.Link>
//           <Navbar.Link href="#">Company</Navbar.Link>
//         </Navbar.Content>
//         <Navbar.Content
//           css={{
//             "@xs": {
//               w: "12%",
//               jc: "flex-end",
//             },
//           }}
//         >
//           <Dropdown placement="bottom-right">
//             <Navbar.Item>
//               <Dropdown.Trigger>
//                 <Avatar
//                   bordered
//                   as="button"
//                   color="secondary"
//                   size="md"
//                   src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
//                 />
//               </Dropdown.Trigger>
//             </Navbar.Item>
//             <Dropdown.Menu
//               aria-label="User menu actions"
//               color="secondary"
//               onAction={(actionKey) => console.log({ actionKey })}
//             >
//               <Dropdown.Item key="profile" css={{ height: "$18" }}>
//                 <Text b color="inherit" css={{ d: "flex" }}>
//                   Signed in as
//                 </Text>
//                 <Text b color="inherit" css={{ d: "flex" }}>
//                   zoey@example.com
//                 </Text>
//               </Dropdown.Item>
//               <Dropdown.Item key="settings" withDivider>
//                 My Settings
//               </Dropdown.Item>
//               <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
//               <Dropdown.Item key="analytics" withDivider>
//                 Analytics
//               </Dropdown.Item>
//               <Dropdown.Item key="system">System</Dropdown.Item>
//               <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
//               <Dropdown.Item key="help_and_feedback" withDivider>
//                 Help & Feedback
//               </Dropdown.Item>
//               <Dropdown.Item key="logout" withDivider color="error">
//                 Log Out
//               </Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </Navbar.Content>
//         <Navbar.Collapse>
//           {collapseItems.map((item, index) => (
//             <Navbar.CollapseItem
//               key={item}
//               activeColor="secondary"
//               css={{
//                 color: index === collapseItems.length - 1 ? "$error" : "",
//               }}
//               isActive={index === 2}
//             >
//               <Link
//                 color="inherit"
//                 css={{
//                   minWidth: "100%",
//                 }}
//                 href="#"
//               >
//                 {item}
//               </Link>
//             </Navbar.CollapseItem>
//           ))}
//         </Navbar.Collapse>
//       </Navbar>
//       // </div>
//     );
//   };



export const Header: React.FC = () => {
    const { setTheme } = useNextTheme();
    const { isDark, type } = useTheme();

    
    console.log("Dark : %d",isDark)
    return (
      // <div>
      <Navbar shouldHideOnScroll isBordered variant={"sticky"} maxWidth={"xl"} 
      css={{opacity: "0.9"}}>
        <Navbar.Toggle showIn="xs" />
        <Navbar.Brand
          css={{
            "@xs": {
              w: "12%",
            },
          }}
        >
          <Text b color="inherit" hideIn="xs">
            Otsuka electronics Co,ltd.
          </Text>
        </Navbar.Brand>
        <Navbar.Content
          enableCursorHighlight
          activeColor="secondary"
          hideIn="xs"
          variant="highlight-rounded"
        >
          <Navbar.Link  href="#">Features</Navbar.Link>
          <Navbar.Link  href="#">
            Customers
          </Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="./#here">Company</Navbar.Link>
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
      // </div>
    );
  };