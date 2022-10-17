import {Image} from "@nextui-org/react";


export const Logo = () =>{
    return(
        <Image
          autoResize
          width={100}
          height={50}  
          src="https://carisxblob.blob.core.windows.net/bot-resource/otsuka.png"
          alt="Default Image"
          css={{opacity:0.9, height:35}}
        />
    )

}