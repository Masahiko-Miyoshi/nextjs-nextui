import React from 'react';

type Props = {
    className?: string;
    show?: boolean;
  };
  



export const Header: React.FC<Props> = ({ className,show=true }) => {
   
  
    if(!show){
      return null;
    }
    return (
      <div className={className} >
        aaa
      </div>
    );
  };