import React, {Component, PropTypes} from 'react'
import ReactDOM from "react-dom";
import Clipboard from "imoney-react-ui/src/all/clipboard";

class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="">
                <Clipboard text="test" handleText="copy" success={()=>{alert("success!")}}/>
            </div>
        )
    }
}
export default App;