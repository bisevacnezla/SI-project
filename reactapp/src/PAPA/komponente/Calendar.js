import React from 'react';
import moment from 'moment';
import './calendar.css';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import papaApi from './papaApi'

export default class Calendar extends React.Component {
    

    constructor(props) {
        super(props);
        this.state = {
            dateContext: moment(),
            today: moment(),
            showMonthPopup: false,
            showYearPopup: false,
            showFakultet: false,
            showGodine: false,
            showSmijer: false,
            showNeradniDani: false,
            selectedDays: [],
            ispiti:[],
            neradniDani:[]
        }

        this.fijaZaNeradneDane = this.fijaZaNeradneDane.bind(this);
        this.promijeniBoju=this.promijeniBoju.bind(this);
        this.ispitiFakultet=this.ispitiFakultet.bind(this);
        this.ispitiFakultet=this.ispitiFakultet.bind(this);
        this.ispitiSmijer=this.ispitiSmijer.bind(this);
        this.ispitiGodina=this.ispitiGodina.bind(this);
        this.neradniDani=this.neradniDani.bind(this);
    }


    promijeniBoju = (d,m) => {
        this.setState(prevState => ({
            selectedDays: [...prevState.selectedDays, {dan: d, mijesec:m}]
        }));
    }
    fijaZaNeradneDane(){
        papaApi.neradniDani().then((res)=>{
            console.log(res.data);
            let niz=[];
            for (let a = 0; a < res.data.length; a++ ) {
                let datum=new moment(res.data[a].datum)
                niz.push({
                    naziv:res.data[a].naziv,
                    dan:datum.format('D'),
                    mijesec:datum.format('MMMM')
                });
            }
            console.log(niz);
            this.setState({
                neradniDani:niz
            });
        }).catch((err)=>{
            this.setState({
                neradniDani:[]
            });
        });
    }

    componentDidMount() {
        papaApi.sviIspita().then((res) => {
            let niz=[];
            for (let a = 0; a < res.data.length; a++ ) {
                let datum=new moment(res.data[a].datum)
                niz.push({
                    sala:res.data[a].sala,
                    predmet:res.data[a].predmet,
                    godina:res.data[a].godina,
                    odsjek:res.data[a].odsjek,
                    dan:datum.format('D'),
                    mijesec:datum.format('MMMM')
                });
            } 
            this.setState({
              ispiti:niz
            });
            this.fijaZaNeradneDane();
          }).catch((err)=>{
            this.setState({
              ispiti:[]});
          });;
      }
    ispitiFakultet(){
        this.setState({
            showFakultet: true,
            showGodine: false,
            showSmijer: false,
            showNeradniDani: false
        });
    }
    
    ispitiSmijer(){
        this.setState({
            showFakultet: false,
            showGodine: false,
            showSmijer: true,
            showNeradniDani: false
        });
    }
    ispitiGodina(){
        this.setState({
            showFakultet: false,
            showGodine: true,
            showSmijer: false,
            showNeradniDani: false
        });
    }
    neradniDani(){
        this.setState({
            showNeradniDani: true,
            showFakultet: false,
            showGodine: false,
            showSmijer: false
        });
    }

    weekdays = moment.weekdays(); //["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday"]
    weekdaysShort =  ["Ned", "Pon", "Uto", "Sri", "Cet", "Pet", "Sub"];
    months = moment.months();

    year = () => {
        return this.state.dateContext.format("Y");
    }
    month = () => {
        return this.state.dateContext.format("MMMM");
    }
    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    }
    currentDate = () => {
        console.log("currentDate: ", this.state.dateContext.get("date"));
        return this.state.dateContext.get("date");
    }
    currentDay = () => {
        return this.state.dateContext.format("D");
    }

    firstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext).startOf('month').format('d'); // Day of week 0...1..5...6
        return firstDay;
    }
    setMonth = (month) => {
        let monthNo = this.months.indexOf(month);
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("month", monthNo);
        this.setState({
            dateContext: dateContext
        });
    }

    nextMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).add(1, "month");
        console.log(dateContext);
        this.setState({
            dateContext: dateContext
        });
        this.props.onNextMonth && this.props.onNextMonth();
    }

    prevMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).subtract(1, "month");
        this.setState({
            dateContext: dateContext
        });
        this.props.onPrevMonth && this.props.onPrevMonth();
    }

    onSelectChange = (e, data) => {
        this.setMonth(data);
        this.props.onMonthChange && this.props.onMonthChange();

    }
    SelectList = (props) => {
        let popup = props.data.map((data) => {
            return (
                <div key={data}>
                    <a href="#" onClick={(e)=> {this.onSelectChange(e, data)}}>
                        {data}
                    </a>
                </div>
            );
        });

        return (
            <div className="month-popup">
                {popup}
            </div>
        );
    }

    onChangeMonth = (e, month) => {
        this.setState({
            showMonthPopup: !this.state.showMonthPopup
        });
    }

    MonthNav = () => {
        return (
            <span className="label-month"
                onClick={(e)=> {this.onChangeMonth(e, this.month())}}>
                {this.month()}
                {this.state.showMonthPopup &&
                 <this.SelectList data={this.months} />
                }
            </span>
        );
    }

    showYearEditor = () => {
        this.setState({
            showYearNav: true
        });
    }

    setYear = (year) => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("year", year);
        this.setState({
            dateContext: dateContext
        })
    }
    onYearChange = (e) => {
        this.setYear(e.target.value);
        this.props.onYearChange && this.props.onYearChange(e, e.target.value);
    }

    onKeyUpYear = (e) => {
        if (e.which === 13 || e.which === 27) {
            this.setYear(e.target.value);
            this.setState({
                showYearNav: false
            })
        }
    }

    YearNav = () => {
        return (
            this.state.showYearNav ?
            <input
                defaultValue = {this.year()}
                className="editor-year"
                ref={(yearInput) => { this.yearInput = yearInput}}
                onKeyUp= {(e) => this.onKeyUpYear(e)}
                onChange = {(e) => this.onYearChange(e)}
                type="number"
                placeholder="year"/>
            :
            <span
                className="label-year"
                onDoubleClick={(e)=> { this.showYearEditor()}}>
                {this.year()}
            </span>
        );
    }
    containsObject = (obj, list) => {
        for (let i =  0; i < list.length; i++) {
            if (list[i].dan == obj.dan && list[i].mijesec == obj.mijesec) {
                return true;
            }
        }
        return false;
    }
    staTrebaPisati = (obj,list) => {
        let string=""+obj.dan;
        for (let i =  0; i < list.length; i++) {
            if (list[i].dan == obj.dan && list[i].mijesec == obj.mijesec) {
                if(this.state.showFakultet || this.state.showGodine || this.state.showSmijer){
                    string=string+"(Predemt: " + list[i].predmet + ", Sala: "+  list[i].sala;
                    if( this.state.showGodine ) { string=string+ ", Godina studija: " +list[i].godina; }
                    if( this.state.showSmijer ) { string=string+ ", Odsjek: " +list[i].odsjek}
                    string=string+")"
                }
                else if( this.state.showNeradniDani ){
                    string=string+ "(" +list[i].naziv + ")";
                }
            }
        }
        return string;
    }
    render(){
        let weekdays = this.weekdaysShort.map((day) => {
            return (
                <td key={day} className="week-day" >{day}</td>
            )
        });

        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td key={i * 80} className="emptySlot">
                {""}
                </td>
            );
        }


        let daysInMonth = [];
        for (var i = 1; i <= this.daysInMonth(); i++) {
                let d=i;
                let a = this.month();
                let className = (d == this.currentDay() && a==moment().format('MMMM')? "day current-day": "day");
                let selectedClass = (this.containsObject({dan: d, mijesec:a}, this.state.selectedDays ) ? " selected-day " : "");
                let staPise;
                if(this.state.showNeradniDani) {
                    staPise = (this.containsObject({dan: d, mijesec:a}, this.state.neradniDani ) ? this.staTrebaPisati({dan: d, mijesec:a},this.state.neradniDani) : d);
                }
                else{
                    staPise = (this.containsObject({dan: d, mijesec:a}, this.state.ispiti ) ? this.staTrebaPisati({dan: d, mijesec:a},this.state.ispiti) : d);
                }
                daysInMonth.push(
                    <td key={d} className={className + selectedClass} onDoubleClick ={(e) => this.promijeniBoju(d,a)}>
                        {staPise}
                    </td>
                );
        }

        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if ((i % 7) !== 0) {
                cells.push(row);
            } else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });

        let trElems = rows.map((d, i) => {
            return (
                <tr key={i*100}>
                    {d}
                </tr>
            );
        })
        return (
            <div className="calendar-container"  style={{ width: '100%', height: '100%', margin:"0"}}>
                <div className='bg-primary' style={{width: '100%',  display: 'flex',justifyContent:'space-between', padding:'1%', backgroundColor:"#eaecef"}}>
                    {<h3 style={{color:"white"}} >Kalendar</h3>}
                    <ButtonGroup vertical >
                    <DropdownButton as={ButtonGroup} 
                        alignRight
                        title="Filteri "
                        id="dropdown-menu-align-right">
                        <Dropdown.Item eventKey="1" onClick={this.ispitiFakultet}>Ispiti na nivou fakulteta</Dropdown.Item>
                        <Dropdown.Item eventKey="2" onClick={this.ispitiSmijer}>Ispiti po smijeru </Dropdown.Item>
                        <Dropdown.Item eventKey="3" onClick={this.ispitiGodina}>Ispiti po godinama </Dropdown.Item>
                        <Dropdown.Item eventKey="4" onClick={this.neradniDani}>Neradni dani</Dropdown.Item>
                    </DropdownButton>
                    </ButtonGroup>
                </div>
                <table className="calendar">
                    <thead>
                        <tr className="calendar-header">
                        <td className="nav-month">
                               <div >
                                    <ButtonToolbar style={{float:"left"}} >
                                        <ToggleButtonGroup type="checkbox" defaultValue={[1, 2]}>
                                        <button className="myButton" value={1} onClick={(e)=> {this.prevMonth()}} > &lt; </button>
                                        </ToggleButtonGroup>
                                    </ButtonToolbar>
                               </div>
                            </td>
                            <td colSpan="5" className="naslov">
                                <this.MonthNav />
                                {" "}
                                <this.YearNav />
                            </td>
                            <td className="nav-month">
                               <div >
                                    <ButtonToolbar style={{float:"right"}} >
                                        <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]}>
                                        <button className="myButton" value={2} onClick={(e)=> {this.nextMonth()}} > &gt; </button>
                                        </ToggleButtonGroup>
                                    </ButtonToolbar>
                               </div>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {weekdays}
                        </tr>
                        {trElems}
                    </tbody>
                </table>

            </div>
        )
    }
}