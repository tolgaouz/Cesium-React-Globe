import React from 'react';
import { Viewer,Scene,PointPrimitive,PointPrimitiveCollection,Entity, EntityStaticDescription, EntityDescription} from "resium";
import { GeoJsonDataSource,Cartesian3, Color } from "cesium";
import { Link } from 'react-router-dom';
import fire from './Firebase';


class Globe extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:'',
      render:false,
      currentPoint:null,
      height:window.innerHeight,
      width:500,
      show:false
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

  renderCard = (e,target)=>{
    
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
        infoBox={false}
        full>
        <Entity
        ></Entity>
        {this.state.render ? this.state.data.map((val,idx)=>{
          return(
            <Entity
            key={'entity_'+idx}
            properties={val}
            name="Event Description"
            point={{pixelSize:8,color:Color.BLUEVIOLET}}
            onClick={(e,target)=>{console.log(target)}}
            position={Cartesian3.fromDegrees(val['long'],val['lat'],100)}/>
        )}) : <div></div>}
      </Viewer>
      <Link style={{position:'absolute','top':10,'left':10}} to='/backend'>Go to Backend</Link>
    </div>
    )
  }
}

export default Globe  