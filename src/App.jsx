import React, { Component } from 'react';
import Header from './components/Header';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Logo from './components/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank'
import FaceRecognition from './components/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: 'a4fe351bd53545eaaf97109e17f80689'
});

const particlesOptions = {
    particles: {
        line_linked: {
            shadow: {
                enable: true,
                color: "#3CA9D1",
                blur: 5
            }
        }
    }
}

class App extends Component {
    state = {
        url: '',
        imageFromUrl: '',
        box: {}, //top_row, bottom_row, left_col, right_col these are properties of bounding box
        route: 'signin', //it tracks where we are at the page
        isSignedIn: false,
        user: {
            id: '',
            name: '',
            email: '',
            entries: 0,
            joined: ''
        }
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    }
    // this function is called based on the input we get from CLARIFAI
    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;  //bounding_box is a percentage of the image
        const image = document.getElementById('inputimage');
        const width = Number(image.width); // grabbing the height and width of the image
        const height = Number(image.height); // making a string number
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        console.log(box);
        this.setState({ box: box })
    }
    enteringUrl = (event) => {
        this.setState({ url: event.target.value });
    }

    onPictureSubmit = () => {
        this.setState({ imageFromUrl: this.state.url })
        app.models  // using the API Clarifai - clarifai.Model
            .predict(Clarifai.FACE_DETECT_MODEL, this.state.url)
            .then(response => {
                if (response) {
                    fetch('http://localhost:3000/image', {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: this.state.user.id })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, { entries: count }))
                        })
                }

                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err));
    }

    changingRoute = (route) => {
        if (route === 'signout')
            this.setState({ isSignedIn: false })
        if (route === 'home')
            this.setState({ isSignedIn: true })
        this.setState({ route: route })
    }

    render() {
        const { route, box, imageFromUrl, isSignedIn } = this.state;
        return (
            <div className="App">
                <Particles className="particles"
                    params={particlesOptions}
                />
                <Header isSignedIn={isSignedIn} changingRoute={this.changingRoute} />
                {route === 'home' ?
                    <div>
                        <Logo />
                        <Rank
                            name={this.state.user.name}
                            entries={this.state.user.entries} />
                        <ImageLinkForm
                            enteringUrl={this.enteringUrl}
                            onPictureSubmit={this.onPictureSubmit}
                        />
                        <FaceRecognition
                            box={box}
                            imageFromUrl={imageFromUrl}
                        />
                    </div> : (
                        route === 'signin'
                            ? <SignIn loadUser={this.loadUser} changingRoute={this.changingRoute} />
                            : <Register loadUser={this.loadUser} changingRoute={this.changingRoute} />
                    )

                }
            </div>
        );
    }
}

export default App;