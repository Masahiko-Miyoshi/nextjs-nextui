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

import {Data} from '@/data/sample-data';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { Z_BUF_ERROR } from 'zlib';


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

    'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 10, '#f1f075', 30, '#f28cb1'],
    'circle-opacity': ['step', ['get', 'point_count'], 0.5, 10, 0.5, 30, 0.5],
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
    'icon-image':"hospital-JP",
    // 'icon-image':"cat",
    "icon-size": 1.5
  },
};


type ErrorMapProps = {
 request: string;

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
}


export const ErrorMap:NextPage<ErrorMapProps> = (props) => {

  const {request}=props;
  const mapRef = useRef<MapRef>(null);

  const [showPopupParam, setShowPopupParam] = React.useState<TypeShowPopupParam>({show:false});


 

  const onLoad = (event:mapboxgl.MapboxEvent<undefined>):void =>{
      if(request==="zoom"){
      mapRef.current?.flyTo({center: [118.08, 24.48], duration: 2000, zoom: 17});
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
        setShowPopupParam({show:false}); 
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
        lon: coordinates[1],});
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
      mapRef.current?.flyTo({center: [lat, lon], duration: 2000, zoom: z});
    }
    setShowPopupParam({show:false}); 

  }

  return (
    <>
   
     <Map
        initialViewState={{
          latitude: 40.67,
          longitude: -103.59,
          zoom: 3,
        }}
        // mapStyle="mapbox://styles/mapbox/dark-v10"
        // mapStyle = "mapbox://styles/miyoshimasahiko/ckymdbhj60zo014mob9ayej95"
        mapStyle = "mapbox://styles/miyoshimasahiko/clahuihs2000915qj7dxw3rxv"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id,unclusteredPointLayer.id] as string[]}
        onClick={onClick}
        onLoad={onLoad}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={mapRef}
        style={{width: 1500, height: 1000}}
        projection = {"globe"}
        // pitch={85}
        maxPitch ={85}
        maxZoom={21}
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
            magSum : ['+', ['get', 'mag']],
            maxSum : ['max', ['get', 'mag']],
          }}
          
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer}  />
        </Source>
        <PopupLabel show={showPopupParam.show}  
                    message={showPopupParam.message}
                    top={showPopupParam.top}
                    left={showPopupParam.left} 
                    onPress={onPressMapLabel} />
        

      </Map>
    </>
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
  const argParam = query?.request as string
  return {
    props: {
      request:argParam || null
    }
    // revalidate: 1,
  };
}


export default ErrorMap;


