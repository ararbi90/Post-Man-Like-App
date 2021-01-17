import React from "react";
import Split from "react-split";
import 'bootstrap/dist/css/bootstrap.css';

import Response from "./components/Response";
import Request from "./components/Request";


import "./index.css";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
    this.sendResponse = this.sendResponse.bind(this);
  }
  
  sendResponse = (data) =>{
    this.setState({
      data:data
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Post Man Like Application</h1>
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
          <Request sendResponse={this.sendResponse}/>
          <Response data={this.state.data}/>
        </Split>

      </div>
    );
  }
}

export default App;
