import React, {Component, PropTypes} from 'react'
import ReactDOM from "react-dom";

class Footer extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="footer">
                <p>Copyright © 2017 <a href="https://www.w3cmm.com/">w3cmm.com</a>.</p>
            </div>
        )
    }
}
export default Footer