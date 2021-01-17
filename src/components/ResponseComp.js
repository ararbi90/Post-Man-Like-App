import React, {Component} from "react";
import "../index.css";
export default class ResponseComp extends Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return (<div style={{outline: "1px solid #ccc", padding: "5px", margin:"5px"}}> 
            {JSON.stringify(this.props.instance, undefined, 4)}
        </div>);
    }
}