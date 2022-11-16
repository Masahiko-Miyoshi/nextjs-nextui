import {icons} from '@/component/common/icons';
import {HeaderMenu} from "@/component/common/HeaderMenu";
import type {HeaderMenuProps} from "@/component/common/HeaderMenu";
import styles from "@/styles/Home.module.css";
import Router from "next/router";

const handleNoOfTests = ()=>{
  Router.push("/#");
}

const handleBigUser = ()=>{
  Router.push("/#");
}

const handleAnalytes = ()=>{
  Router.push("/#POS_ANALYTES");
}

const handleNoOfError = ()=>{
  Router.push("/#POS_ANALYTES");
}

const handleErrorList = ()=>{
  Router.push("error-map");
}

const handleErrorMap = ()=>{
  Router.push("error-map");
}




const headerMenuProps:HeaderMenuProps[] =[
{
  itemType: "dropdown",
  title:"本日の検査状況",
  childrenItem: [
    {
      key: "NoOfTests",
      title: "検査数",
      discription: "本日の検査数の推移を確認できます",
      func: handleNoOfTests,
      // icon: icons.scale,
      icon: icons.activity,
    },
    {
      key: "BigUser",
      title: "検査数の多い施設",
      discription: "検査数の多い施設を確認します",
      func: handleBigUser,
      icon: icons.scale,
    },
    {
      key: "Analytes",
      title: "検査項目",
      discription: "本日の測定頻度の高い検査項目を確認します",
      func: handleAnalytes,
      icon: icons.flash,
    },
    {
      key: "NoOfError",
      title: "エラー",
      discription: "本日のエラー数の推移を確認できます",
      func: handleNoOfError,
      icon:icons.user,
    },
  
  ]
},

{
  itemType: "dropdown",
  title:"本日のエラー",
  childrenItem: [
    {
      key: "ErrorList",
      title: "エラーリスト",
      discription: "発生したエラーを時系列で確認できます",
      func: handleErrorList,
      icon:icons.user,
    },
    {
      key: "ErrorMap",
      title: "エラーマップ",
      discription: "エラーの発生場所を地図上で確認できます",
      func: handleErrorMap,
      icon: icons.server,
    },
    
  ]
},
{
  itemType: "nav",
  title: "プロセスモニター",
  to:"process-monitor",
},
{
  itemType: "nav",
  title: "過去の統計データ",
  to:"/",
},

{
  itemType: "nav",
  title: "ボット",
  to:"chat-bot",
},
{
  itemType: "nav",
  title: "設定",
  to:"setting",
},


]



export const Header: React.FC = () => {
    return(
      
      <div className={styles.header}>
        <HeaderMenu headerMenuProps={headerMenuProps} />
      </div>
      
    )
}