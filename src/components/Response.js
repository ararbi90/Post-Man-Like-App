import React, {Component} from "react";
import ResponseComp from "./ResponseComp"
import "../index.css";

export default class Response extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let arr = [];
        Object.keys(this.props.data).forEach(d => {
            arr.push(<ResponseComp instance={{[d]: this.props.data[d]}}/>)
        });
        return (<div className="comp border"> 
        <h3>Responses</h3>
        {arr}
        </div>);
    }
}