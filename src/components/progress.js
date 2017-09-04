import React, {Component, PropTypes} from 'react'
import ReactDOM from "react-dom";
import Progress from "imoney-react-ui/src/progress";
import "imoney-react-ui/src/progress/style.css";
Progress.configure({ showSpinner: false });
class App extends Component {
    constructor(props) {
        super(props)
        this.start = this.start.bind(this);
        this.done = this.done.bind(this);
    }

    componentDidMount() {
    }
    start(){
        Progress.start();
    }
    done(){
        Progress.done();
    }

    render() {
        return (
            <div className="">
                <button onClick={this.start}>start</button>
                <button onClick={this.done}>done</button>
            </div>
        )
    }
}
export default App;