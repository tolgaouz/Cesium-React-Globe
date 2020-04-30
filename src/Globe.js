import React from 'react';
import { Viewer,Scene,PointPrimitive,PointPrimitiveCollection,Entity, EntityStaticDescription, EntityDescription} from "resium";
import { GeoJsonDataSource,Cartesian3, Color } from "cesium";
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import fire from './Firebase';
import Collapse from './Collapse'
import HomeButton from './HomeButton'

class Globe extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:'',
      render:false,
      currentPoint:null,
      height:window.innerHeight,
      width:500
    }
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  componentDidMount = ()=>{
    window.addEventListener('resize', this.updateDimensions);
    fire.database().ref('data').on('value',(data)=>{
      let result = JSON.parse(data.val())['data']
      this.setState({
        data:result,
        render:true
      })
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render(){
    let card_style = {
      position:'absolute',
      top:100,
      right:0,
      width:'300px'
    }
    return(
      <div>
        <Viewer timeline={false} 
        vrButton={false} 
        sceneModePicker={false}
        homeButton={false}
        navigationHelpButton={false}
        infoBox={false} full>
        {this.state.render ? this.state.data.map((val,idx)=>{
          return(
            <Entity
            key={'entity_'+idx}
            name="Event Description"
            position={Cartesian3.fromDegrees(val['long'],val['lat'],100)}/>
        )}) : <div></div>}
      </Viewer>
      <Collapse/>
      <Link style={{position:'absolute','top':10,'left':10}} to='/backend'>Go to Backend</Link>
    </div>
    )
  }
}

export default Globe  