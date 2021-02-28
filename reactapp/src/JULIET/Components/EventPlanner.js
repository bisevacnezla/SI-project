import React, { Component } from 'react';
import NewEventForm from './NewEventForm';
import Axios from 'axios';
import '../styles/EventPlanner.css';

class EventPlanner extends Component {
    constructor(props){
        super(props);

        this.state = {
            events: [],
            
            showForm:false,
            ulaz:new Date(),
            traje:null
        }
        this.addEvent = this.addEvent.bind(this);
        this.getEvents = this.getEvents.bind(this);
        this.isToday = this.isToday.bind(this);
        this.didPass= this.didPass.bind(this);
        this.isNow = this.isNow.bind(this);
    }
    showEventForm(){
        this.setState({
            showForm: !this.state.showForm
        })
    }
    componentWillMount(){
        this.setState({
            events: [],
            ulaz: Date.now()
        });
        this.getEvents();
        setInterval(function(){
            this.setState({
                ulaz: Date.now()
            });
        }.bind(this), 60000);
    }
    getEvents(){
        Axios.get('https://si2019juliet.herokuapp.com/events')
        .then(res => {
            this.setState({
                events: res.data
            });
        })
        .catch(err => console.log(err));
    }
    addEvent = (ime,pocinje,kraj)=>{
        const reqBody = {
            kreirao:this.props.currentId,
            naziv:ime,
            pocetak:pocinje,
            kraj:kraj
        }
        console.log(reqBody);

        Axios.post('https://si2019juliet.herokuapp.com/event' , reqBody)
        .then(res => {
            let nizTmp = this.state.events;
            nizTmp.push(reqBody);

            this.setState({ events: nizTmp });
            this.getEvents();
        }).catch(err => {
            console.error(err);
            alert(err)
        });
    }
    isToday(event){
        
        if( ((Date.parse(event.pocetak)<=(86400000+this.state.ulaz))||(Date.parse(event.kraj)<=(86400000+this.state.ulaz)) ))return true;
        return false
    }
    didPass(event){
        if( (Date.parse(event.kraj)<this.state.ulaz)) return true;
        return false
    }
    isNow(event){
        if( (Date.parse(event.kraj)>=this.state.ulaz) && (Date.parse(event.pocetak)<=this.state.ulaz)  ) return true;
        return false
    }
    render(){
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          }
          let todaysEvents=[];
          let otherEvents=[];
          if (this.state.events){todaysEvents = this.state.events.filter(event=>this.isToday(event));
          otherEvents = this.state.events.filter(event=>!this.isToday(event) && !this.didPass(event));}
        return(
                <div style={{width: '100%', padding: '10px 0'}}>     
                    <div className="juliet-section-h" onClick={(e) => {
                            let node = document.getElementById('all-planners')
                            let display = node.style.display;
                            node.style.display = display === "block" ? 'none' : "block";
                            node = document.getElementById('arrow-planners');
                            let innerHTML = node.innerHTML; 
                            node.innerHTML = innerHTML === "keyboard_arrow_right" ? "keyboard_arrow_down" : "keyboard_arrow_right"
                        }}>
                        <div className="juliet-section-header"><h5>Organizator događaja</h5></div>
                        <i id="arrow-planners" class="material-icons-outlined md-14">keyboard_arrow_right</i>
                    </div> 
                    <ul style={{overflowX: 'hidden', height:'80%', margin: '0', display: 'none'}} id="all-planners">
                        <button id='juliet-create-event-btn' onClick={()=>this.showEventForm()} style={{width: '80%', background: this.props.colorScheme, color: 'white', borderRadius: '10px'}}>Kreirajte novi event</button>
                        {
                            this.state.showForm?
                            <NewEventForm addEvent={this.addEvent}/>
                            :null
                        }
                        <div className="juliet-section-header juliet-section-element"><h6>Sljedećih 24 sata</h6></div>
                        {todaysEvents ? 
                            todaysEvents.map((event, index) => {
                                const active = this.isNow(event)===true ?'active':'';
                                const activeText = this.isNow(event)===true ?' ACTIVE!':'';
                                return <li className={"juliet-event"+active } key={index}>{ event.naziv+ ' @ '+new Intl.DateTimeFormat('it-IT',options).format(new Date( Date.parse(event.pocetak)))+activeText} </li>
                            })
                            :
                            null }
                        <div className="juliet-section-header juliet-section-element"><h6>Kasniji događaji</h6></div>
                        {otherEvents ? 
                            otherEvents.map((event, index) => (
                                <li className={"juliet-event" } key={index}>{ event.naziv+ ' @ '+new Intl.DateTimeFormat('it-IT',options).format(new Date( Date.parse(event.pocetak)))} </li>
                            ))
                            :
                            null  }   
                    </ul>
                    
                </div>
                )
    }
}

export default EventPlanner;