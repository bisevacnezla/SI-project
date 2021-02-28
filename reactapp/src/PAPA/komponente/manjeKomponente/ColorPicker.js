import React, { Component } from 'react';
import './stil.css'

class ColorPicker extends Component{

    constructor(props){
        super(props);
        this.orange = this.orange.bind(this);
        this.blue = this.blue.bind(this);
        this.green = this.green.bind(this);
        this.pink = this.pink.bind(this);
        this.yellow = this.yellow.bind(this);
        this.brown = this.brown.bind(this);
        this.purple = this.purple.bind(this); 
        this.white = this.white.bind(this);
        this.gray = this.gray.bind(this);
        this.black = this.black.bind(this);
    }

    orange(){ this.props.promijeniBoju("orange"); }
    blue(){ this.props.promijeniBoju("blue"); }
    green(){ this.props.promijeniBoju("green"); }
    pink(){ this.props.promijeniBoju("pink"); }
    yellow(){ this.props.promijeniBoju("yellow"); }
    brown(){ this.props.promijeniBoju("brown"); }
    purple(){ this.props.promijeniBoju("purple"); }
    white(){ this.props.promijeniBoju("white"); }
    gray(){ this.props.promijeniBoju("gray"); }
    black(){ this.props.promijeniBoju("black"); }

    render(){
        return(
            <div style={{ width: '100%', display:"flex", justifyContent:'space-between', padding: "3%"}}>
                <div className={"boja"}  onClick={this.orange} style={{ backgroundColor:"orange" }}></div>
                <div className={"boja"}  onClick={this.blue} style={{ backgroundColor:"blue" }}></div>
                <div className={"boja"}  onClick={this.green} style={{ backgroundColor:"green" }}></div>
                <div className={"boja"}  onClick={this.pink} style={{ backgroundColor:"pink" }}></div>
                <div className={"boja"}  onClick={this.yellow} style={{ backgroundColor:"yellow" }}></div>
                <div className={"boja"}  onClick={this.brown} style={{ backgroundColor:"brown" }}></div>
                <div className={"boja"}  onClick={this.purple} style={{ backgroundColor:"purple" }}></div>
                <div className={"boja"}  onClick={this.white} style={{ backgroundColor:"white" }}></div>
                <div className={"boja"}  onClick={this.gray} style={{ backgroundColor:"gray" }}></div>
                <div className={"boja"}  onClick={this.black} style={{ backgroundColor:"black" }}></div>
            </div>
        )
        
    }
}
export default ColorPicker;