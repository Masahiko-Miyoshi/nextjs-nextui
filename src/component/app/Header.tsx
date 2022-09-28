import React from 'react';

type Props = {
    className?: string;
    isShow?: boolean;
  };
  



export const Header: React.FC<Props> = ({ className,isShow=true }) => {
   
  
    if(!isShow){
      return null;
    }
    return (
      <div className={className} >
        aaa
      </div>
    );
  };