import React, {Component, PropTypes} from 'react'
import ReactDOM from "react-dom";
import "./asset/style.css";
class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="container">
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
                <div className="hero">
                    <h1>iMoney</h1>
                    <h2>A JavaScript library for building user interfaces</h2>
                </div>
                <div className="footer">
                    <p>Copyright © 2017 <a href="https://www.w3cmm.com/">w3cmm.com</a>.</p>
                </div>
            </div>
        )
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
)