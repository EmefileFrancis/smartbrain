import React from 'react';
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'
import Navigation from './components/navigation/Navigation'
import FaceRecognition from './components/facerecognition/FaceRecognition'
import SignIn from './components/signin/SignIn'
import Register from './components/register/Register'
import Logo from './components/logo/Logo.js'
import Rank from './components/rank/Rank.js'
import ImageLinkForm from './components/imagelinkform/ImageLinkForm.js'
import './App.css';

const app = new Clarifai.App({
  apiKey: 'f017cfc6ad1442688f56fb11e57155b3'
 });

const particlesNumOptions = {
        "number": {
          "value": 70
      },
      "size": {
          "value": 3
      }
    }

const particlesInteractivityOptions = {
    "events": {
        "onhover": {
            "enable": true,
            "mode": "repulse"
        }
    }
  }

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      input: '',
      facesBoundingBoxes: [],
      route: 'signin'
    }
  }

  getFaceBoundingBoxCoords = (theData) => {

    const image = document.getElementById('image')
    const width = Number(image.width);
    const height = Number(image.height);

    const clarifaiRegions = theData.outputs[0].data.regions
    return clarifaiRegions.map((region) => {
      const boundingBox = region.region_info.bounding_box;
      return {
        top: boundingBox.top_row * height,
        left: boundingBox.left_col * width,
        bottom: height - (boundingBox.bottom_row * height),
        right: width - (boundingBox.right_col * width)
      }
    })
  }

  displayFaceBoundingBoxCoords = (data) => {
    this.setState({
      facesBoundingBoxes: data
    })
  }

  onInputChanged = (event) => {
    this.setState({
      input: event.target.value,
      facesBoundingBoxes: []
    })
  }

  onButtonClicked = () => {
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
      .then(response => this.displayFaceBoundingBoxCoords(this.getFaceBoundingBoxCoords(response))
      .catch(err => console.log(err))
    );
  }

  onRouteChange = (route) => {
    console.log('route', route)
    this.setState({
      route: route
    })
  }

  render(){
    const { input, facesBoundingBoxes, route } = this.state;
    return (
      <div className="App">
        <Particles className='background'
          params={{
            "particles": particlesNumOptions,
            "interactivity": particlesInteractivityOptions
        }} />

        { route === 'signin' 
            ? <div>
                <Logo/>
                <SignIn onRouteChange={this.onRouteChange}/> 
              </div>
            :
            (route === 'register'
            ? <div>
                <Logo/>
                <Register onRouteChange={this.onRouteChange}/>
              </div>
            :
            <div>
              <Navigation onRouteChange={this.onRouteChange}/>
              <Logo/>
              <Rank/>
              <ImageLinkForm 
                onInputChanged={this.onInputChanged}
                onButtonClicked={this.onButtonClicked}
              />
              <FaceRecognition
                input={input}
                facesBoundingBoxes={facesBoundingBoxes}
              />
            </div>)
        }
      </div>
    );
  }
}

export default App;
