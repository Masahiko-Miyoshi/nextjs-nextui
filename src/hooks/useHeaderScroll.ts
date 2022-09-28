import React from 'react';

// External variables used only in this function 
let UHS_nowMousePos = 0;
let UHS_prevMousePos = 0;
let UHS_noiseCounter = 0;
let UHS_mouseEventCounter = 0;

let UHS_mouseEvent = 0;

export const useHeaderScroll = (): boolean => {
  const [isHeaderActive, setIsHeaderActive] = React.useState<boolean>(true);

  // function to reduce mouse sensitivity
  const isRemoveNoise = ():boolean =>{
    ++UHS_noiseCounter;
    if(UHS_noiseCounter>1){
      UHS_noiseCounter = 0;
      return true;
    }
    return false;
  }
  //

  React.useEffect(() => {
    const scrollWindow = () => {
      ++UHS_mouseEventCounter;
      UHS_nowMousePos = window.scrollY;
      console.log("<<<<<<<<<<<<<< "+UHS_nowMousePos)
      //ignore 1'st event with position 0
      if(UHS_mouseEventCounter ===1 && UHS_nowMousePos===0){
        return;
      }
      //Forces header to be active when mouse position is 0
      if( UHS_nowMousePos===0 ){
        setIsHeaderActive(true);
      }

      // When scrolling down, the header is inactive
      else if(isHeaderActive && UHS_prevMousePos < UHS_nowMousePos){
        if(isRemoveNoise()){
          setIsHeaderActive(false);
        }
      }
      //When scrolling up and mouse event exist within 500msec , the header is active
      else if(!isHeaderActive && UHS_prevMousePos > UHS_nowMousePos){
        if(isRemoveNoise() && UHS_mouseEvent ) {
          setIsHeaderActive(true);
        }
      }
      //Header inactive for the first event.This is to deactivate the header when jumping with a Link operation.
      else if(!UHS_mouseEvent){
        setIsHeaderActive(false);
      }
      console.log("Scrolling !!!!!"+"  "+window.scrollY+" "+UHS_mouseEvent)
      
      // Hold current position
      UHS_prevMousePos = UHS_nowMousePos;
    };
    UHS_prevMousePos = 0; 
    UHS_nowMousePos = 0;
    UHS_mouseEventCounter = 0;
    console.log("Add linstener !!!");
    window.addEventListener('scroll', scrollWindow);
    const UHS_intervalId:NodeJS.Timer = setInterval(()=>
      {UHS_mouseEvent=UHS_mouseEventCounter;
       UHS_mouseEventCounter=0;
      },
    500);
    return () => {
      console.log("Remove linstener !!!");
      window.removeEventListener('scroll', scrollWindow);
      clearInterval(UHS_intervalId);
    };
  },[isHeaderActive]);
  
  return  isHeaderActive ;
};



