import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const classes = {
  root: {
    minWidth: 275,
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
      data:''
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
          <Typography variant="body2" component="p">
            Latitude: {this.props.data ? this.props.data.lat : ''}
          </Typography>
          <hr></hr>
          <Typography variant="body2" component="p">
            Longtitude: {this.props.data ? this.props.data.long : ''}
          </Typography>
          <hr></hr>
          <Typography variant="body1" component="p">
            Tags: {this.props.data ? this.props.data.tags : ''}
          </Typography>
          {this.props.data ? <iframe width="360" height="215" src={"https://www.youtube.com/embed/"+vid_id} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> : <div></div>}
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