import * as React from 'react';
import {NextPage,GetStaticProps,GetServerSideProps} from 'next';
import {useRef} from 'react';
import {Map,Source, Layer,useMap,Popup} from 'react-map-gl';
import type {LayerProps} from 'react-map-gl';
import type {MapRef} from 'react-map-gl';
import  type {GeoJSONSource} from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
// If the following import is remove, warinng happen !
import 'mapbox-gl/dist/mapbox-gl.css';
import {PopupLabel} from  '@/component/common/PopupLabel';
import {NavCardOnMap} from  '@/component/app/NavCardOnMap';
import {Data} from '@/data/sample-data';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import {Grid} from "@nextui-org/react";


const MAPBOX_TOKEN = 'pk.eyJ1IjoibWl5b3NoaW1hc2FoaWtvIiwiYSI6ImNreW1kMXNlajJsOWIyb21sdTI5c2J0enkifQ.EDMYy_IZHN46YqcRpRXoLA'; // Set your mapbox token here

const clusterLayer: LayerProps = {
  id: 'clusters',
  type: 'circle',
  source: 'earthquakes',
  filter: ['has', 'point_count'],
  paint: {
    // 'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
    // 'circle-opacity': ['step', ['get', 'point_count'], 0.5, 100, 0.5, 750, 0.5],
    // 'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 50]
    // 'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 10, '#f1f075', 30, '#f28cb1'],
    'circle-color': ['step', ['get', 'sumFelt'], '#51bbd6', 1, '#f28cb1', 30, '#f28cb1'],
    'circle-opacity': ['step', ['get', 'point_count'], 0.5, 10, 0.6, 30, 0.4],
    'circle-radius': ['step', ['get', 'point_count'], 20, 10, 30, 30, 50]

  }
};

const clusterCountLayer: LayerProps = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'earthquakes',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    // 'text-field': '{sumFelt}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12
  }
};

const unclusteredPointLayer: LayerProps = {
  id: 'unclustered-point',
  type: 'symbol',
  source: 'earthquakes',
  filter: ['!', ['has', 'point_count']],
  // paint: {
  //   'circle-color': '#11b4da',
  //   'circle-radius': 4,
  //   'circle-stroke-width': 1,
  //   'circle-stroke-color': '#fff'
  // },
 
  layout: {
    'icon-image':["case",["<",["get","felt"],1],"hospital-JP-green","hospital-JP"],


    // 'icon-image':"cat",
    "icon-size": 1.5
  },
};


const heatLayer: LayerProps = {
  id: 'heat',
  type: 'heatmap',
  source: 'earthquakes',
  'paint': {
    'heatmap-weight': [
      'interpolate', ['linear'], ['get', 'mag'],
      0, 0,
      5, 2
    ],
    'heatmap-intensity': 1,
    'heatmap-color': [
      'interpolate', ['linear'], ['heatmap-density'],    
      0, 'rgba(33,102,172,0)',
      0.2, 'rgb(103,169,207)',
      0.4, 'rgb(209,229,240)',
      0.6, 'rgb(253,219,199)',
      0.8, 'rgb(239,138,98)',
      1, 'rgb(178,24,43)'
    ],
    'heatmap-radius': 100,
    'heatmap-opacity': 0.8
  }
};



type ErrorMapProps = {
 request?: string;
 hospitalName?: string;
 lat?: number,
 lon?: number,
}


// export function MapImage() {
//   const { current: map } = useMap();
  

//   if (map && !map.hasImage('cat')) {
//     map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/cat.png', (error, image) => {
//       if (error) throw error;
//       if (!map.hasImage('cat') && image) map.addImage('cat', image, { sdf: true });
//     });
//   }

//   return null;
// }


type TypeShowPopupParam = {
    show: boolean,
    message?: string,
    left?: number,
    top?: number,
    lat?: number,
    lon?: number,
    visit?: boolean,
    hospitalName:string,
}


const ErrorMap:NextPage<ErrorMapProps> = (props) => {

  const {request,lon,lat,hospitalName}=props;
  const mapRef = useRef<MapRef>(null);
  const [showPopupParam, setShowPopupParam] = React.useState<TypeShowPopupParam>({show:false, hospitalName:hospitalName?hospitalName:"" });

  const onLoad = (event:mapboxgl.MapboxEvent<undefined>):void =>{
      if(request==="visit"){
       if(lon && lat){ 
        mapRef.current?.flyTo({center: [lon, lat], duration: 5000, zoom: 17});
       }
      if(hospitalName){
        setShowPopupParam({show:false, visit:true, hospitalName:hospitalName,}); 
      }
      }

  }
  const onClick = (event:any) => {
    if(!mapRef.current) return;
    const map = mapRef.current;
    console.log(map.getZoom());
   
    const feature = event.features[0];
    if(!feature){
      console.log("Feachuer null!")
      if(showPopupParam.show)
        setShowPopupParam({show:false, visit:showPopupParam.visit, hospitalName:""}); 
       return;
    }
    const clusterId = feature.properties.cluster_id;
    const layerId = feature.layer.id;
    
    if(layerId === "clusters"){
        const mapboxSource = map.getSource('earthquakes') as GeoJSONSource;
        mapboxSource.getClusterExpansionZoom(clusterId, (err:any, zoom:any) => {
          if (err) {
            console.log("Click zoom Error ");
            return;
          }
          // console.log("WWW",feature.geometry.coordinates)
          map.easeTo({
          center: feature.geometry.coordinates,
          zoom,
          duration: 500,

          })
          
        });
        console.log("Click zoom OK ");
    }
    else if(layerId === "unclustered-point"){
      // const coordinates =feature.geometry.coordinates.slice();
      // setShowPopupParam({show:true, 
      //                     message:event.features[0].properties.id, 
      //                     left: event.point.x,
      //                     top: event.point.y,
      //                     lat: coordinates[0],
      //                     lon: coordinates[1],});
    }
  };

 

  
  const onMouseEnter = (event:any)=>{
    if(!mapRef.current) return;
    const map = mapRef.current;

    const feature = event.features[0];
    if(!feature) return;
    const layerId = feature.layer.id;

    if(layerId === "unclustered-point"){
      map.getCanvas().style.cursor = 'pointer';
      console.log("Enter !");

      const coordinates =feature.geometry.coordinates.slice();

      setShowPopupParam({show:true, 
        message:event.features[0].properties.id + "へ訪問する", 
        left: event.point.x,
        top: event.point.y,
        lat: coordinates[0],
        lon: coordinates[1],
        hospitalName:event.features[0].properties.id });
        
    }

  }


  const onMouseLeave = (event:any)=>{
    if(!mapRef.current) return;
    const map = mapRef.current;

    const feature = event.features[0];
    if(!feature) return;
    const layerId = feature.layer.id;
    
    if(layerId === "unclustered-point"){
      map.getCanvas().style.cursor = '';
      console.log("Leave !");
    }
  }

  const onPressMapLabel = (e:any)=>{
    console.log(showPopupParam);
    const lat = showPopupParam.lat;
    const lon = showPopupParam.lon;
    if(lat && lon){
      let z;
      if(lat>130 && lat < 145 && lon > 31.5 && lon < 44){
        z = 17;
      }
      else{
        z = 10;
      }
      mapRef.current?.flyTo({center: [lat, lon], duration: 5000, zoom: z});
    }
    setShowPopupParam({show:false, visit:true,hospitalName:showPopupParam.hospitalName}); 
  }


  const handleNavClose = (e: any)=>{
    console.log("Enter Enter");
    setShowPopupParam({show:false, visit:false, hospitalName:""}); 
  }


  const url = "https://carisxblob.blob.core.windows.net/bot-resource/病院.png";
  let a,b;
  if(showPopupParam.visit){
    a = 9.2;
    b = 2.8;
  }
  else{
    a = 12;
    b = 0;
  }
  return (
      <Grid.Container
      gap={1}
      justify="center"
      alignItems="center"
      css={{ maxW:2000, marginTop:0 }}
      >
      
      <Grid xs={0} md={a} xl={a} justify="center">
        
     <Map
        initialViewState={{
          latitude: 36,
          longitude: 140,
          zoom: 3,
        }}
        // mapStyle="mapbox://styles/mapbox/dark-v10"
        mapStyle = "mapbox://styles/miyoshimasahiko/ckymdbhj60zo014mob9ayej95"
        // mapStyle = "mapbox://styles/miyoshimasahiko/clahuihs2000915qj7dxw3rxv"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id,unclusteredPointLayer.id] as string[]}
        onClick={onClick}
        onLoad={onLoad}
        
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={mapRef}
        style={{width: 1500, height: 750}}
        projection = {"globe"}
        // pitch={85}
        maxPitch ={85}
        maxZoom={18}
      >


        {/* <MapImage /> */}


        <Source
          id="earthquakes"
          type="geojson"
          // data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
          data={Data as FeatureCollection<Geometry, GeoJsonProperties>}

          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
          clusterProperties={{
            sumMag : ['+', ['get', 'mag']],
            maxMag : ['max', ['get', 'mag']],
            sumFelt : ['+', ['get', 'felt']],
          }}
          
        >
          {/* 病院をクラスター化し描画するレイヤー */}
          <Layer {...clusterLayer} />
           {/* クラスター化された病院数を描画するレイヤー */}
          <Layer {...clusterCountLayer} />
           {/* クラスター化されない病院を描画するレイヤー */}
          <Layer {...unclusteredPointLayer}  />
           {/*　ヒートマップレイヤー　AIに書いてもらいます*/}
          <Layer {...heatLayer} />
         

        </Source>
        <PopupLabel show={showPopupParam.show}  
                    message={showPopupParam.message}
                    top={showPopupParam.top}
                    left={showPopupParam.left} 
                    onPress={onPressMapLabel} />
 

      </Map>
      </Grid>
      
      <Grid xs={12} md={b} xl={b} justify="center">
        <NavCardOnMap title={showPopupParam.hospitalName+" へようこそ❤"} footerText='' imageUrl={url} onClose={handleNavClose} />
      </Grid>
      </Grid.Container>
  );
}





/*
export const getStaticProps: GetStaticProps<ErrorMapProps> = async ({params}) => {
  console.log("Error map SSG running !!!\n");
  const argParam = params?.request as string
  console.log("EE ",argParam)
  return {
    props: {
      request:argParam || null
    }
    // revalidate: 1,
  };
}
*/


export const getServerSideProps: GetServerSideProps= async ({query}) => {
  console.log("Error map SSR running !!!\n");
  const request = query?.request as string;
  const lat = parseFloat(query?.lat as string);
  const lon = parseFloat(query?.lon as string);
  const hospitalName = query?.hospitalName as string;

console.log(query)

  return {
    props: {
      request :request?request:null,
      lat: lat?lat:null,
      lon: lon?lon:null,
      hospitalName: hospitalName?hospitalName:"",
    }
    // revalidate: 1,
  };
}


export default ErrorMap;


