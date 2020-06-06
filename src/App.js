import React from "react";
import soundLibrary from "./sounds.json";

const keyLibrary = Object.keys(soundLibrary);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: `Display`
    };
    this.keyPressed = this.keyPressed.bind(this);
  }

  keyPressed(event) {
    const key = String.fromCharCode(event.keyCode).toUpperCase();
    //console.log(key);
    if (keyLibrary.includes(key)) {
      this.playSound(key);
    }
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keyPressed);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.keyPressed);
  }

  playSound(id) {
    document.getElementById(id).play();
    this.setState({
      displayText: soundLibrary[id].header
    });
  }

  drumPadGenerator() {
    let drumPad = [];

    for (let i = 0; i < keyLibrary.length; i++) {
      const key = keyLibrary[i];
      const temp = (
        <div className="col-4 p-1" key={key}>
          <button
            id={soundLibrary[key].header}
            className="drum-pad btn btn-success btn-block"
            onClick={this.playSound.bind(this, key)}
          >
            <audio id={key} src={soundLibrary[key].url} className="clip" />
            {key}
          </button>
        </div>
      );
      drumPad.push(temp);
    }
    return drumPad;
  }

  render() {
    return (
      <div>
        <div className="shadow-sm card ">
          {/*<h4 className="text-center card-header"></h4>*/}
          <div className="my-3 ml-3 row" id="drum-machine">
            <div className=" col-8 row">{this.drumPadGenerator()}</div>
            <div
              id="display"
              className="col-4 mr-1 my-1 pt-5 text-white rounded text-center bg-dark"
            >
              {this.state.displayText}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
