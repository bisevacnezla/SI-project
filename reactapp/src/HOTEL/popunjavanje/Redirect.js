import React from 'react'

export default class App extends React.Component {
    componentDidMount() {
        window.location.href = window.location.origin + this.props.to
    }
    render() {
        return (
            <div>
            </div>
        )
    }
}