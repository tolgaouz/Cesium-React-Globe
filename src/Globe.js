import React from 'react';
import { Viewer,Entity, CesiumWidget} from "resium";
import { Cartesian3, Color } from "cesium";
import { Col,Container,Row } from 'react-bootstrap';
import { FormControlLabel, Switch} from '@material-ui/core';
import Info from './Info'
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
        render:true,
        showCard:false,
        currentInfo:'',
        liveOnly:false
      })
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  renderCard = (e,target)=>{
    let prop_names = target['_properties']._propertyNames
    let data = {}
    prop_names.forEach((prop,idx)=>{
      data[prop] = target['_properties'][prop]._value
    })
    console.log(data)
    this.setState({
      currentInfo:data
    }) 
  }

  render(){
    return(
      <div style={{overflow:"hidden"}}>
        <Row>
          <Col xs={20} md={9} style={{height:"100vh"}}>
            <Viewer timeline={false} 
            vrButton={false} 
            sceneModePicker={false}
            homeButton={false}
            navigationHelpButton={false}
            animation={false}
            infoBox={false} style={{height:"100%"}}>
            {this.state.render ? this.state.data.map((val,idx)=>{
              let pixel_size = val['live'] ? 14 : 8
              let [r,g,b,a] = val['color'].split(',')
              if(this.state.liveOnly){
                if(!val['live']){
                  return <div></div>
                }
              }
              return(
                <Entity
                key={'entity_'+idx}
                properties={val}
                name="Event Description"
                label="Live"
                point={{pixelSize:pixel_size,color:Color.fromBytes(parseInt(r),parseInt(g),parseInt(b),parseInt(a))}}
                onClick={this.renderCard}
                position={Cartesian3.fromDegrees(val['long'],val['lat'],100)}/>
            )}) : <div></div>}
          </Viewer>
          </Col>
          <Col md={3} style={{backgroundColor:"#212121",marginLeft:"-15px"}}>
            <div>
              <Link style={{marginLeft:'10px'}}to='/backend'>Go to Backend</Link>
              <Link style={{marginLeft:'10px'}} to='/addpoint'>Send us a point!</Link>
              <FormControlLabel
              control={<Switch checked={this.state.liveOnly} 
              onChange={()=>{this.setState({liveOnly:!this.state.liveOnly})}} 
              name="liveOnly"/>}
              label="Show live masses only"
              style={{color:"#ffffff"}}
            />
            </div>
            <Info style={{marginBottom:"20px"}} data={this.state.currentInfo}/>
          </Col>
          </Row>
    </div>
    )
  }
}

export default Globe  