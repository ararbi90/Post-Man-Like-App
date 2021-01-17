import React, {Component} from "react";
import "../index.css";
export default class Response extends Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return (<div className="comp border"> 
        <h3>Responses</h3>


        <br />
        <button className="btn btn-primary">Clear</button>
        </div>);
    }
}