import React from 'react';
import url from '../url'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {}
        }
    }
    render() {
        const items = this.state.items
        return (
            <div>
                {items.ankete ? items.ankete.map(anketa => (
                    <div>
                        {anketa.naziv}
                    </div>
                )) : "Loading..."}
            </div>
        )
    }
    componentDidMount() { 
        fetch(url + '/dajAnkete', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(result => {
            this.setState({
                items: result
            })
        }, error => {
            this.setState({
                error: [error, "error"]
            })
        })
    }
}

export default App;