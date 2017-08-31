import React, {Component, PropTypes} from 'react'
import ReactDOM from "react-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import "./asset/common.css";
import "./asset/app.css";
class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="container">
                <Header/>
                <div className="hero">
                    <div className="ui-w">
                        <h1>iMoney</h1>
                        <h2>A JavaScript library for building user interfaces</h2>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
)