import React, { Component } from 'react'
import axios from 'axios'
import '../../index.css';

class Counter extends Component {
    constructor() {
        super()
        this.state = {
            requests: []
        }
    }

    // componentDidMount() {
    //     axios.get("http://localhost:3003/requests")
    //     .then(response => {
    //         console.log(response.data)
    //         this.setState({ requests: response.data.requests });
    //       })
    // }

    render() {

        const {error, requests } = this.state;

        if (error) {
            return (
                <div>
                    Error: {error.message}
                </div>
            );
        } else {
        return (
            <div className="m-top_xx-large">
                <h1>
                    Available Tasks: 
                </h1>
                {requests.map(request => <div>{request.length}</div>)}
            </div>
        )
        }
    }
}

export default Counter