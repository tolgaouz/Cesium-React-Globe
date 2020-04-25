import React from 'react';
import { Viewer,PointPrimitive,PointPrimitiveCollection, GeoJsonDataSource } from "resium";
import { Cartesian3, Cartesian2, Color, Cartographic, Transforms } from "cesium";

const data = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          86.572265625,
          64.20637724320852
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          86.8798828125,
          61.689872200460016
        ]
      }
    }
  ]
}

class Globe extends React.Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  render(){
    return(
    <Viewer timeline={false} 
    vrButton={false} 
    sceneModePicker={false}
    homeButton={false}
    navigationHelpButton={false}
    full>
      <GeoJsonDataSource
          data={data}
          markerColor={Color.RED}
          markerSize={24}
        />
    
    </Viewer>
    )
  }
}

export default Globe  