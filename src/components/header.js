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
                            <li><a href="https://github.com/imoney-team/imoney">iMoney</a></li>
                            <li><a href="https://github.com/imoney-team/imoney-react-ui">iMoney-React-UI</a></li>
                            <li><a href="https://github.com/imoney-team/imoney-react-d3">iMoney-React-D3</a></li>
                        </ul>
                        <ul className="nav-external">
                            <li><a href="https://github.com/imoney-team">Github</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}
export default Header