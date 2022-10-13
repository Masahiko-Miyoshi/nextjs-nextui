import React from 'react';
import { Text,Tooltip,Link} from "@nextui-org/react";
import {LinkCard} from '@/component/app/LinkCard';


export type CardContent = {
    menuTitle:string;
    cardTitle:string;
    cardDiscription:string;
    to:string;
}

type Props = {
    cardContents: CardContent[];
}




export const TooltipWithCard: React.FC<Props> = ({cardContents}) => {
    
    return (
        <>
        {cardContents.map((item,index)=>{
            console.log("");
            return (
            <Tooltip  key={index} placement="bottom" content={<LinkCard title={item.cardTitle} text={item.cardDiscription} url={item.to} />}>
                <Link>
                <Text>
                    {item.menuTitle}
                </Text>
                </Link>
            </Tooltip>
            )}
        )}
        </>
    );
            
}


