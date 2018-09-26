import React, {Component, PropTypes} from 'react'
import ReactDOM from "react-dom";
import CountUp, {startAnimation} from "react-ui/src/all/countUp";

class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="">
                <CountUp className="countUp" start={0} end={100} duration={3} ref={(countUp) => {
                    this.myCountUp = countUp;
                }}/>
                <br/>
                <button className="Button" onClick={(event) => {
                    startAnimation(this.myCountUp);
                }}>Count me up!
                </button>
            </div>
        )
    }
}
export default App;