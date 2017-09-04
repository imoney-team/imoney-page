import React, {Component, PropTypes} from 'react'
import ReactDOM from "react-dom";
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import Header from "./components/header";
import Footer from "./components/footer";
import Progress from "./components/progress";
import CountUp from "./components/countUp";

import "./asset/common.css";
import "./asset/demo.css";

const Home = () => (
    <div>
        <h2>Home page</h2>
    </div>
)
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
                <div className="ui-w">
                    <div className="demo">
                        <Router>
                            <div>
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/progress">progress</Link></li>
                                    <li><Link to="/countUp">countUp</Link></li>
                                </ul>

                                <hr/>

                                <Route exact path="/" component={Home}/>
                                <Route path="/progress" component={Progress}/>
                                <Route path="/CountUp" component={CountUp}/>
                            </div>
                        </Router>
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