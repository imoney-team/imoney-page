import React, {Component, PropTypes} from 'react'
import ReactDOM from "react-dom";

class Header extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="header">
                <div className="ui-w">
                    <a href="/" className="logo"></a>
                    <nav className="nav">
                        <ul className="nav-internal">
                            <li><a href="https://github.com/thunkli/imoney">iMoney</a></li>
                            <li><a href="https://github.com/thunkli/react-ui">react-ui</a></li>
                            <li><a href="https://github.com/thunkli/react-d3">react-d3</a></li>
                        </ul>
                        <ul className="nav-external">
                            <li><a href="https://github.com/thunkli/imoney-page">Github</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}
export default Header