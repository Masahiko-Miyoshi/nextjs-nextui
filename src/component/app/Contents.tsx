import React from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
    isShow:boolean;
  };
  
  export const Contents: React.FC<Props> = ({ children, className, isShow }) => {
    if(!isShow){
      return null;
    }
    return (
      <div className={className} >
        
          {children}
        
      </div>
    );
  };
  