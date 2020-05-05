import React from 'react';
import { Viewer,Entity} from "resium";
import { Cartesian3, Color } from "cesium";
import { Collapse, Button, FormControlLabel, Switch} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
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
      <div style={{position:'absolute','top':10,'left':10}}>
        <Link to='/backend'>Go to Backend</Link>
        <FormControlLabel
        style={{'marginLeft':'20px',color:'white'}}
        control={<Switch checked={this.state.liveOnly} 
        onChange={()=>{this.setState({liveOnly:!this.state.liveOnly})}} 
        name="liveOnly" />}
        label="Show live masses only"
      />
      </div>
      
      <div id="info" style={{position:'absolute','top':80,'right':20,bottom:20}}>
        <Button variant="contained" color="secondary" onClick={()=>{this.setState({showCard:!this.state.showCard})}}>
          Show Point Information <ArrowDropDownIcon/>
        </Button>
        <Collapse orientation='vertical' in={this.state.showCard}>
          <Info data={this.state.currentInfo}/>
        </Collapse>
      </div>
    </div>
    )
  }
}

export default Globe  