import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import fire from './Firebase'
const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class AddPointForm extends React.Component{

  constructor(props){
    super(props)
    this.state={
      vid_url:'',
      lat:null,
      long:null,
      status:'',
      sent_today:'',
      disabled_submit:false
    }
  }

  handleChange = (e)=>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  componentWillMount = ()=>{
    if(localStorage.pointsSent){
      var points_sent = parseInt(localStorage.pointsSent)
      this.setState({
        sent_today:points_sent
      })
      if(points_sent>1){
        this.setState({
          disabled_submit:true
        })
      }
    }
  }
  handleSubmit = (e)=>{
    e.preventDefault()
    var points_sent = this.state.sent_today
    fire.database().ref('user_suggested_points').push(this.state).then(()=>{
      points_sent = points_sent + 1
      localStorage.setItem('pointsSent',points_sent)
      this.setState({
        success:true
      })
    })
  }
  render(){
    const {classes} = this.props;
    return (
      <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Send us a point!
          </Typography>
          <Typography component="p" variant="p">
          {this.state.sent_today ? <span>(Sent {this.state.sent_today} points today)</span> : <span></span>}
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="lat"
                  variant="outlined"
                  required
                  fullWidth
                  id="lat"
                  label="Latitude"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="long"
                  label="Longitude"
                  name="long"
                  autoComplete="long"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="vid_url"
                  label="Youtube URL"
                  name="vid_url"
                  autoComplete="url"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel id="status">Status</InputLabel>
                  <Select
                    fullWidth
                    required
                    labelId="status"
                    id="status"
                    name="status"
                    value={this.state.status}
                    onChange={this.handleChange}
                  >
                    <MenuItem value={'live'}>Live</MenuItem>
                    <MenuItem value={'normal'}>Normal</MenuItem>
                    <MenuItem value={'scheduled'}>Scheduled Live</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              disabled={this.state.disabled_submit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Send
            </Button>
          </form>
        </div>
        {this.state.success ? <Alert severity="success">Sent successfully</Alert> : <div></div>}
        {this.state.disabled_submit ? <Alert severity="warning">You've reached the limit!</Alert> : <div></div>}
      </Container>
      </div>
    );
  }
}

export default withStyles(useStyles)(AddPointForm)