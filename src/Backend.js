import fire from './Firebase'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Container, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const gjv = require("geojson-validation");

class Backend extends React.Component{
  constructor(props){
    super(props)
    this.state={
      submitDisabled:true,
      error:'',
      file:null,
      success:false
    }
  }

  checkValidity = (e)=>{
    let file = e.target.files[0]
    if(!file.type.includes('json')){
      this.setState({
        error:'Please put in a valid json file.'
      })
    }
    var reader = new FileReader();
    reader.addEventListener('loadend',(e)=>{
      this.setState({
        submitDisabled:false,
        file:e.target.result,
      })
    })
    reader.readAsText(file)
  }

  uploadFirebase = (e)=>{
    e.preventDefault()
    fire.database().ref('data').set(this.state.file).then(dt=>{
      this.setState({
        success:true
      })
    })

  }

  render(){
    return(
      <div>
      <Link to='/' style={{'position':'absolute','left':10,'top':10}}>Back to Globe</Link>
      <Container>
      <Col md={{ span:6, offset:3}}>
      <center>
      <h2>
        Upload GeoJSON
      </h2>
      {this.state.error ? <Alert variant='danger'>{this.state.error}</Alert> : <div></div>}
      </center>
      <br></br>
      <Form onSubmit={this.uploadFirebase}>
        <Form.File
          onChange={this.checkValidity} 
          id="custom-file"
          label="Please choose a file to upload"
        />
        <Button type='submit' disabled={this.state.submitDisabled} style={{'marginTop':'20px'}}>Submit</Button>
      </Form>
      {this.state.success ? <Alert style={{marginTop:'30px'}}variant='success'>Data saved successfully!</Alert> : <div></div>}
      </Col>
      </Container>
      </div>
    )
  }
}

export default Backend