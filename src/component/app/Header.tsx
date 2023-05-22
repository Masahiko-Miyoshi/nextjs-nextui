import {icons} from '@/component/common/icons';
import {HeaderMenu} from "@/component/common/HeaderMenu";
import type {HeaderMenuProps} from "@/component/common/HeaderMenu";
import styles from "@/styles/Home.module.css";
import Router from "next/router";

const handleNoOfTests = ()=>{
  Router.push("/#");
  // window.open("https://login.teamviewer.com/Connect","_blank");

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
  Router.push("error-list");
}

const handleErrorMap = ()=>{
  Router.push("error-map");
}

const handleProcessMonitor = ()=>{
  Router.push("assay-evidence");
}

const handleSensorMonitor = () =>{
  Router.push("process-monitor");
}

const handleExternalQC = () =>{
  
}


const handleInternalQC = () =>{
  
}

const handleReagentConsumption = () =>{
    
  }

const handleAboutError = () =>{
      
  }
  
 const handleConcDistribution = () =>{

  }


const headerMenuProps:HeaderMenuProps[] =[
{
  itemType: "dropdown",
  title:"本日の検査状況",
  childrenItem: [
    {
      key: "NoOfTests",
      title: "検査数とエラー数",
      discription: "本日の検査数、エラー数の推移を確認できます",
      func: handleNoOfTests,
      // icon: icons.scale,
      icon: icons.activity,
    },
    {
      key: "BigUser",
      title: "施設Top5",
      discription: "検査数の多い施設を確認します",
      func: handleBigUser,
      icon: icons.scale,
    },
    {
      key: "Analytes",
      title: "試薬Top5",
      discription: "本日の測定頻度の高い検査項目を確認します",
      func: handleAnalytes,
      icon: icons.flash,
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
  itemType: "dropdown",
  title: "モニター",
  childrenItem: [
    {
      key: "ProcessMonitor",
      title: "プロセスモニター",
      discription: "検体の測定エビデンスを確認できます",
      func: handleProcessMonitor,
      icon:icons.user,
    },
    {
      key: "SensorMonitor",
      title: "センサーモニター",
      discription: "機器のセンサの状態を確認できます",
      func: handleSensorMonitor,
      icon: icons.server,
    },
    {
      key: "ExternalQC",
      title: "外部QC",
      discription: "外部QCを確認できます",
      func: handleExternalQC,
      icon: icons.server,
    },
    {
      key: "InternalQC",
      title: "内部QC",
      discription: "内部QCを確認できます",
      func: handleInternalQC,
      icon: icons.server,
    },

  ]

},

{
  itemType: "dropdown",
  title:"過去の統計データ",
  childrenItem: [
    {
      key: "ReagentConsumption",
      title: "試薬消費",
      discription: "過去の試薬消費量を確認できます",
      func: handleReagentConsumption,
      icon:icons.user,
    },
    {
      key: "AboutError",
      title: "エラー関連",
      discription: "過去のエラー情報を確認できます",
      func: handleAboutError,
      icon: icons.server,
    },
    {
      key: "ConcDistribution",
      title: "濃度分布",
      discription: "検査項目の濃度分布を確認できます",
      func: handleConcDistribution,
      icon: icons.server,
    },
  ]
},

{
  itemType: "nav",
  title: "ボット",
  to:"chat-bot",
},
{
  itemType: "nav",
  title: "リモート接続",
   to:"https://start.teamviewer.com/ja/",
  // to:"https://start.teamviewer.com/device/1296315314/authorization/password/mode/control",
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