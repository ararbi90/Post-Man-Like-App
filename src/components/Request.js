import React, { Component } from "react";
import RequestParam from "./RequestParamInstance";
import nextId from "react-id-generator";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import "../index.css";
import 'react-toastify/dist/ReactToastify.css';

const notify = () => toast.info("Cannot Add on GET request");
const conentType = () => toast.info("Please Select a Content-Type");
const errorToast = () => toast.error("Request could not be made");

export default class Request extends Component {
    constructor(props) {
        super(props);

        this.state = {
            payload: [],
            method: "GET",
            address: "",
            contentType: "Content-Type"
        }
        this.createRequestParam = this.createRequestParam.bind(this);
        this.updateRequestId = this.updateRequestId.bind(this);
        this.updateRequestVal = this.updateRequestVal.bind(this);
        this.deleteRequestParam = this.deleteRequestParam.bind(this);
        this.addNewParam = this.addNewParam.bind(this);
        this.handelSubmit = this.handelSubmit.bind(this);
        this.updateMethod = this.updateMethod.bind(this);
        this.handelGet = this.handelGet.bind(this);
        this.handelPost = this.handelPost.bind(this);
        this.handelDelete = this.handelDelete.bind(this);
        this.handelUpdate = this.handelUpdate.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.updateContentType = this.updateContentType.bind(this);
    }
    /**
     * Pass to child RequestParam to update id
     * @param {*} key of child
     * @param {*} update val to be updated
     */
    updateRequestId = (key, update) => {
        let pay = [...this.state.payload];
        for (let i = 0; i < pay.length; i++) {
            if (pay[i].keyId === key) {
                pay[i].id = update;
                break;
            }
        }
        this.setState(({
            payload: pay
        }))
    }
    /**
     * Pass to child to update value
     * @param {*} key of child
     * @param {*} update value to be updated
     */
    updateRequestVal = (key, update) => {
        let pay = [...this.state.payload];
        for (let i = 0; i < pay.length; i++) {
            if (pay[i].keyId === key) {
                pay[i].val = update;
                break;
            }
        }
        this.setState(({
            payload: pay
        }))
    }

    /**
     * Pass to child to update hidden status
     * @param {*} key chid id
     */
    deleteRequestParam = (key) => {
        let pay = [...this.state.payload];
        for (let i = 0; i < pay.length; i++) {
            if (pay[i].keyId === key) {
                pay[i].hidden = true;
                break;
            }
        }
        this.setState(({
            payload: pay
        }))
    }

    /**
     * Create new request param based on id
     * @param {*} event click event
     */
    addNewParam(event) {
        event.preventDefault();
        if (this.state.method === "GET") {
            notify()
            return;
        }
        let param = this.createRequestParam();
        let payload = [...this.state.payload];
        payload.push(param)
        this.setState({
            payload: payload
        })
    }

    /**
     * Create new request param
     */
    createRequestParam() {
        let param = {
            keyId: nextId(),
            id: "",
            val: "",
            hidden: false
        }
        return param;
    }

    /**
     * Create new component based on param
     * @param {*} param to be rendered
     */
    createRequestComp(param) {
        return <RequestParam
            id={param.id}
            keyId={param.keyId}
            val={param.val}
            hidden={param.hidden}
            updateRequestId={this.updateRequestId}
            updateRequestVal={this.updateRequestVal}
            deleteRequestParam={this.deleteRequestParam} />
    }

    /**
     * Handel submit
     * @param {*} event 
     */
    handelSubmit(event) {
        event.preventDefault();
        let payload = [...this.state.payload];
        let arr = payload.filter(val => !val.hidden);
        let data = {}
        arr.forEach(val => data[val.id] = val.val);

        switch (this.state.method) {
            case "GET":
                this.handelGet(data);
                break;
            case "POST":
                this.handelPost(data);
                break;
            case "DELETE":
                this.handelDelete(data);
                break;
            case "UPDATE":
                this.handelUpdate(data);
                break;
        }
    }

    /**
     * Update method type
     * @param {*} event 
     */
    updateMethod(event) {
        if (event.target.value === "GET") {
            let pay = [...this.state.payload];
            for (let i = 0; i < pay.length; i++) pay[i].hidden = true;
            this.setState({
                method: event.target.value,
                payload: pay,
                contentType: "Content-Type"
            })
        }
        else {
            this.setState({
                method: event.target.value
            })
        }
    }
    /**
     * Added a comment:wq
     * @param {*} event 
     */
    updateAddress(event) {
        this.setState({
            address: event.target.value
        })
    }

    getPostPutParams(data, type) {
        if (type === "application/x-www-form-urlencoded") {
            const params = new URLSearchParams();
            Object.keys(data).forEach(key => {
                params.append(key, data[key])
            })
            return params;
        }
        return data;
    }

    handelGet() {
        axios.get(this.state.address)
            .then(res => {
                this.props.sendResponse(res.data)
            })
            .catch(err => errorToast())
    }

    handelPost(data) {
        if (this.state.contentType === "Content-Type") {
            conentType();
            return;
        }
        let headers = {
            'Content-Type': this.state.contentType
        }
        if (this.state.contentType === "none") {
            headers = {};
        }
        data = this.getPostPutParams(data, this.state.contentType)
        axios.post(this.state.address, data, { headers: headers })
            .then(res => {
                this.props.sendResponse(res.data)
            })
            .catch(err => errorToast())
    }

    handelDelete(data) {
        axios.delete(this.state.address, { data: data })
            .then(res => {
                this.props.sendResponse(res.data)
            })
            .catch(err => errorToast())
    }

    handelUpdate(data) {
        if (this.state.contentType === "Content-Type") {
            conentType();
            return;
        }
        let headers = {
            'Content-Type': this.state.contentType
        }
        if (this.state.contentType === "none") {
            headers = {};
        }
        data = this.getPostPutParams(data, this.state.contentType)
        axios.put(this.state.address, data, { headers: headers })
            .then(res => {
                this.props.sendResponse(res.data)
            })
            .catch(err => errorToast())
    }

    updateContentType(event) {
        this.setState({
            contentType: event.target.value
        })
    }

    render() {
        let arr = [];
        this.state.payload.forEach(value => arr.push(this.createRequestComp(value)))
        return (
            <div className="comp border">
                <h1>Resquests</h1>
                <form>
                    <div className="row mb-3" style={{ margin: "0 auto", width: "90%" }}>
                        <div className="col" style={{ width: "30%" }}>
                            <select class="custom-select mb-3" onChange={this.updateMethod}>
                                <option selected value="GET">GET</option>
                                <option value="POST">POST</option>
                                <option value="UPDATE">UPDATE</option>
                                <option value="DELETE">DELETE</option>
                            </select>
                        </div>

                        <div className="col-9">
                            <input type="text" className="form-control" id="" aria-describedby="key" placeholder="https://google.com" onChange={this.updateAddress} value={this.state.address} />
                        </div>
                    </div>

                    <div className="ml-4 mr-4 mb-2" style={{ display: this.state.method != "POST" && this.state.method != "UPDATE" ? "none" : "block" }}>
                        <select class="custom-select" onChange={this.updateContentType}>
                            <option selected value="Content-Type">Content-Type</option>
                            <option value="application/json">application/json</option>
                            <option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</option>
                            <option value="none">No Content-Type Header</option>
                        </select>
                    </div>

                    {arr}
                    <button type="submit" className="btn btn-primary mr-2" onClick={this.handelSubmit}>Submit</button>
                    <button className="btn btn-primary mr-2" onClick={this.addNewParam}>Add</button>
                </form>
                <ToastContainer />
            </div>
        )
    }
}
