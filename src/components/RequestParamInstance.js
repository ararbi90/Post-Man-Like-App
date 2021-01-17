import React, { Component } from "react";
import "../index.css";

export default class RequestParam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyId: this.props.keyId,
            id: this.props.id,
            val: this.props.val,
            hidden:this.props.hidden
        }
        this.onChangeId = this.onChangeId.bind(this);
        this.onChangeVal = this.onChangeVal.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
    }

    onChangeId(event)
    {
        this.props.updateRequestId(this.state.keyId, event.target.value)
    }

    onChangeVal(event)
    {
        this.props.updateRequestVal(this.state.keyId, event.target.value)
    }

    buttonClick(event)
    {
        event.preventDefault()
        this.props.deleteRequestParam(this.state.keyId);
    }

    render() {
        return (
            <div className="row mb-2" style={{margin:"0 auto", width:"90%", display:this.props.hidden ? "none" : ""}}>
                <div className="col">
                    <input type="text" className="form-control" id="key + {this.state.key}" aria-describedby="id" placeholder="Key" onChange={this.onChangeId} value={this.props.id}/>
                </div>
                <div className="col">
                    <input type="text" className="form-control" id="key + {this.state.val}" aria-describedby="Value" placeholder="Value" onChange={this.onChangeVal} value={this.props.val}/>
                </div>
                <button className="btn btn-primary mr-3" onClick={this.buttonClick}>Remove</button>
            </div>
        )
    }
}