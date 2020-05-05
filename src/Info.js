import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import RefreshIcon from '@material-ui/icons/Refresh';
import Typography from '@material-ui/core/Typography';

const axios = require('axios');

let axiosConfig = {
  crossdomain:true
};

const classes = {
  root: {
    minWidth: 275,
    maxWidth: 400,
    overflowY: 'scroll',
    maxHeight: 450,
    backgroundColor:'gray',
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
  /*
  var view = 10
    var viewLoading = false
    if(this.props.data && this.props.data.live){
      viewLoading = true
      let data = {
        url:this.props.data.vid_url
      }
      this.get_views(data).then(dt=>{
        console.log(dt)
        view = dt.data
        viewLoading = false
        console.log(view)
        console.log(viewLoading)
      })
    }
    */
  componentWillReceiveProps = (props)=>{
    console.log(props)
    this.setState({
      viewLoading:false,
      views:null
    })
    if(props.data && props.data.live){
      console.log('this is live')
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
    return (
      <Card style={classes.root} variant="outlined">
        <CardContent>
          <Typography style={classes.title} color="textSecondary" gutterBottom>
            Entitiy Description
          </Typography>
          <Typography variant="h5" component="h2">
            {this.props.data ? this.props.data.title : ''}
          </Typography>
          <hr></hr>
          {this.props.data ? <iframe width="360" height="215" src={"https://www.youtube.com/embed/"+vid_id} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> : <div></div>}
          <hr></hr>
          {this.state.viewLoading ? <div>Views are loading..</div>:<div></div>}
          {this.state.views ? <div>Views: {this.state.views}<RefreshIcon style={{cursor:'pointer'}} onClick={()=>{this.get_views({url:this.props.data.vid_url})}}></RefreshIcon></div> : <div></div>}
          <Typography variant="body1" component="p">
            Tags: {this.props.data ? this.props.data.tags : ''}
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