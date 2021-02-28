import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export class NewEventForm extends Component {
    constructor(props){
        super(props);

        this.state={
            eventName:'',
            startDate:new Date(),
            diffTime:null,
            endDate:new Date()
        }
        this.handleChangeName=this.handleChangeName.bind(this);
        this.handleChangeStart=this.handleChangeStart.bind(this);
        this.handleChangeEnd=this.handleChangeEnd.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChangeName(e){
      this.setState({ eventName:e.target.value})
    }
    handleChangeStart(startDate){
      this.setState({ startDate:startDate})
    }
    handleChangeEnd(endDate){
      this.setState({
        endDate:endDate,
        diffTime:Math.abs(this.state.startDate.getTime() - endDate.getTime())})
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.addEvent(this.state.eventName, this.state.startDate, this.state.endDate);
        this.setState({eventName:''})
    }
  render() {
    return (
      <div className="new-event-form" style={{padding: '10px'}}>
        <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleChangeName} type='text' placeholder='Choose event name...' value={this.state.eventName} style={{padding: '3px 6px'}}/>
            <p style={{marginTop: '5px', marginBottom: '2px'}}>Početak događaja</p>
            <DatePicker style={{padding:'2px 6px'}}
                selected={this.state.startDate}
                timeInputLabel="Time:"
                showTimeInput
                dateFormat="MMMM d, yyyy h:mm aa"
                timeFormat="HH:mm"
                selectsStart
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeStart}
            />
            <p style={{marginTop: '5px', marginBottom: '2px'}}>Završetak događaja</p>
             <DatePicker style={{padding:'2px 6px'}}
              selected={this.state.endDate}
              timeInputLabel="Time:"
              showTimeInput
              dateFormat="MMMM d, yyyy h:mm aa"
              timeFormat="HH:mm"
              selectsEnd
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleChangeEnd}
          />
            <button id='juliet-create-event-btn' type="submit">+</button>
        </form>
      </div>
    )
  }
}
export default NewEventForm
