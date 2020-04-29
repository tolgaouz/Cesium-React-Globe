import React from 'react';
import { Viewer,PointPrimitive,PointPrimitiveCollection, GeoJsonDataSource } from "resium";
import { Cartesian3, Cartesian2, Color, Cartographic, Transforms } from "cesium";
import fire from './Firebase';

class Globe extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:''
    }
  }

  componentWillMount = ()=>{
    fire.database().ref('data').on('value',(data)=>{
      this.setState({
        data:JSON.parse(data.val())
      })
    })
  }

  render(){
    return(
      <div>
    <Viewer timeline={false} 
    vrButton={false} 
    sceneModePicker={false}
    homeButton={false}
    navigationHelpButton={false} full>
    
      <GeoJsonDataSource
          data={this.state.data}
          markerColor={Color.RED}
          markerSize={24}
        />
    
    </Viewer>
    </div>
    )
  }
}

export default Globe  