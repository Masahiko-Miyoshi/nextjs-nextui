//Define 12 pastel Colors

const PastelColorTable =[
  "#439A97",
  "#62B6B7",
  "#97DECE",
  "#CBEDD5",
  "#F56EB3",
  "#CB1C8D",
  "#7F167F",
  "#460C68",
  "#FFFFD0",
  "#F3CCFF",
  "#D09CFA",
  "#A555EC",
]
export const getPastelColor = (num:number) =>{
  const colors:string[] = [];
  for(let i=0; i<num ; i++){
    colors[i] = PastelColorTable[i%12];
  }
  return colors;
}