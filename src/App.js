import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Split from "react-split";
import 'bootstrap/dist/css/bootstrap.css';

import Response from "./components/Response";
import Request from "./components/Request";
import NavBar from "./components/NavBar"


import "./index.css";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
    this.sendResponse = this.sendResponse.bind(this);
  }

  sendResponse = (data) => {
    this.setState({
      data: data
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <h1 className="mt-2 mb-2">Post Man Like Application</h1>
          <NavBar />
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Split class="wrap"
                sizes={[70, 30]}
                minSize={200}
                expandToMin={false}
                gutterSize={3}
                gutterAlign="center"
                snapOffset={30}
                dragInterval={1}
                direction="horizontal"
                cursor="col-resize">
                <Request sendResponse={this.sendResponse} />
                <Response data={this.state.data} />
              </Split>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

let About = () => {
  return (
    <div style={{ width: "90%", margin: "0 auto", textAlign: "justify" }}>
      <h2 class="mt-2" style={{ textAlign: "center" }}>About</h2>
      <p>
        Thank you for visiting my post man like application. This is not a replacement for it nor 
        does it support all of its features. I didn’t like the fact that I was limited to the amount 
        of requests I could make with it, so I created my own version. This app supports GET, POST (with Content-Type), 
        DELETE and UPDATE/PUT. Like every application this is not perfect and needs some TLC, but does everything that 
        I need it to do for my use cases, so if you have any suggestions please shoot me an email 
        at <a href="mailto:ararbi90@gmail.com">ararbi90@gmail.com</a>
        , or if you would like be become a contributor to any of my projects let me know as well. Here is the link to
        the repo <a href="https://github.com/ararbi90/Post-Man-Like-App" target="_blank">REPO</a><br /><br/>
      Regards,<br />
      Ahmed
      </p>
    </div>
  )
}

export default App;
