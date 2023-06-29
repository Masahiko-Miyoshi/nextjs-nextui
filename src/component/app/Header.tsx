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

const handleExAndInQC = () =>{
  
}



const handleReagentConsumption = () =>{
    
  }

const handleAboutError = () =>{
      
  }
  
 const handleConcDistribution = () =>{

  }

  const handlePatientData = () =>{

  }

  const handleCalibrationData = () =>{

  }

  
  const handleQC = () =>{

  }

  const handleUserSetting = () =>{

  }

  const handleVendorGroupSetting = () =>{
      
  }

  const handleCustomerGroupSetting = () =>{

  }

  const handleModelSetting = () =>{  

  } 

  const handleDeviceSetting = () =>{
      
   }

   const handleRemoteControl = () =>{
    window.open("https://start.teamviewer.com/ja/","_blank");
   }

   const handleProtocolParameter = () =>{
      
   }

   const handleProgram = () =>{
      
   }

   const handleDeviceLogDownload = () =>{
      
   }

   const handleSystemLogDownload = () =>{
      
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
  ]
},

{
  itemType: "dropdown",
  title: "測定データ",
  childrenItem: [
    {
      key: "PatientData",
      title: "検体データ",
      discription: "検体の測定結果を確認できます",
      func: handlePatientData,
      icon:icons.user,
    },
    {
      key: "CalibrationData",
      title: "キャリブレーションデータ",
      discription: "キャリブレーションデータを確認できます",
      func: handleCalibrationData,
      icon: icons.server,
    },
    {
      key: "QC",
      title: "QC",
      discription: "内部QC、外部QCを確認できます",
      func: handleQC,
      icon: icons.server,
    }, 
  ]

},

{
  itemType: "nav",
  title: "試薬、消耗品",
  to:"reagent-consumption",
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
// {
//   itemType: "nav",
//   title: "リモート接続",
//    to:"https://start.teamviewer.com/ja/",
//   // to:"https://start.teamviewer.com/device/1296315314/authorization/password/mode/control",
// },

{
  itemType: "dropdown",
  title:"ユーティリティ",
  childrenItem: [
    {
      key: "RemoteControl",
      title: "リモート接続",
      discription: "機器にリモート接続します",
      func: handleRemoteControl,
      icon:icons.user,
    },
    {
      key: "ProtocolParameter",
      title: "項目パラメータ",
      discription: "項目パラメータのアップロード、ダウンロードができます",
      func: handleProtocolParameter,
      icon: icons.server,
    },
    {
      key: "Program",
      title: "プログラム",
      discription: "プログラムのアップロード、ダウンロードができます",
      func: handleProgram,
      icon: icons.server,
    },
    {
      key: "DeviceLogDownload",
      title: "機器ログダウンロード",
      discription: "機器ログのダウンロードができます",
      func: handleDeviceLogDownload,
      icon: icons.server,
    },
    {
      key: "SytemLogDownload",
      title: "システムログダウンロード",
      discription: "システムログのダウンロードができます",
      func: handleSystemLogDownload,
      icon: icons.server,
    },
    
  ]
},


{
  itemType: "dropdown",
  title:"設定",
  childrenItem: [
    {
      key: "UserSetting",
      title: "ユーザー",
      discription: "ユーザーの追加、編集、削除ができます",
      func: handleUserSetting,
      icon:icons.user,
    },
    {
      key: "VendorGroupSetting",
      title: "ベンダーグループ",
      discription: "ベンダーの追加、編集、削除ができます",
      func: handleVendorGroupSetting,
      icon: icons.server,
    },
    {
      key: "CustomerGroupSetting",
      title: "カスタマーグループ",
      discription: "カスタマーグループの追加、編集、削除ができます",
      func: handleCustomerGroupSetting,
      icon: icons.server,
    },
    {
      key:"ModelSetting",
      title: "モデル",
      discription: "モデルの追加、編集、削除ができます",
      func: handleModelSetting,
      icon: icons.server,
    },
    {
      key:"DeviceSetting",
      title: "機器",
      discription: "機器の追加、編集、削除ができます",
      func: handleDeviceSetting,
      icon: icons.server,
    },
  ]
},


]



export const Header: React.FC = () => {
    return(
      
      <div className={styles.header}>
        <HeaderMenu headerMenuProps={headerMenuProps} />
      </div>
      
    )
}