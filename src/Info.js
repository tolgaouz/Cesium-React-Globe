import React from 'react';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import Chip from '@material-ui/core/Chip';
import RefreshIcon from '@material-ui/icons/Refresh';
import Typography from '@material-ui/core/Typography';

const axios = require('axios');

let axiosConfig = {
  crossdomain:true
};

const classes = {
  root: {
    height: '85%',
    backgroundColor: '#212121',
    border: '0px ',
    color: 'white'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }}

class Info extends React.Component {
  constructor(props){
    super(props)
    this.state={
      viewLoading:false,
      views:null
    }
  }

  get_views = (data) =>{
    return new Promise((resolve,reject)=>{
      console.log(data)
      axios.post('https://view-scraper.herokuapp.com/view',data,axiosConfig).then((result)=>{
        resolve(result.data)
      }).catch((err)=>{
        reject(err)
      })
    })
  }
  
  componentWillReceiveProps = (props)=>{
    this.setState({
      viewLoading:false,
      views:null
    })
    if(props.data && props.data.live){
      this.setState({
        viewLoading:true
      })
      let data = {
        url:props.data.vid_url
      }
      this.get_views(data).then(dt=>{
        this.setState({
          views:dt.data,
          viewLoading:false
        })
      })
    }
  }


  render(){
    let vid_id = this.props.data ? this.props.data.vid_url.split('=')[1] : ''
    let tags = this.props.data ? this.props.data.tags.split(',') : []
    let label_to_color = {catholic:'primary',evangelical:'secondary'}
    return (
      <Card style={classes.root} variant="outlined">
        <CardContent style={{padding:'1em'}}>
          <Typography style={classes.title} color="white" gutterBottom>
            Entitiy Description
          </Typography>
          <Typography variant="h5" component="h2">
            {this.props.data ? this.props.data.title : ''}
          </Typography>
          {this.props.data ? <iframe height="215" src={"https://www.youtube.com/embed/"+vid_id} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> : <div></div>}
          {this.state.viewLoading ? <div>Views are loading..</div>:<div></div>}
          {this.state.views ? <div>Views: {this.state.views}<RefreshIcon style={{cursor:'pointer'}} onClick={()=>{this.get_views({url:this.props.data.vid_url})}}></RefreshIcon></div> : <div></div>}
          <Typography variant="body1" component="p">
            Tags: {this.props.data ? tags.map((tag,idx)=>{
              return(<Chip label={tag} variant="outlined" color={label_to_color[tag]}></Chip>)
            }) : ''}
          </Typography>
          <Typography variant="body1" component="p" style={{textDecorationColor:'none'}}>
          <Link href={this.props.data ? this.props.data.vid_url : '#'}> See on YouTube</Link>
          </Typography>

        </CardContent>
        <CardActions>
        </CardActions>
      </Card>

    );
  }
}

export default Info