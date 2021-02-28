import React, {Component, Fragment} from 'react';
import EditIcon from '@material-ui/icons/Edit';
import Pagination from 'rc-pagination'
import localeInfo from 'rc-pagination/lib/locale/en_US';
import './ProfessorsAvailability.css';
import 'rc-pagination/assets/index.css';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router'
import CircularProgress from '@material-ui/core/CircularProgress';

class ProfessorsAvailability extends Component {
    constructor(props){
        super(props);
        this.state={
            professorsList: [],
            page: 1,
            size: 10,
            total: 0,
            input: '',
            activeDivId: 4,
            professorId: -1
        }
    }
    changeActiveId(id) {
        this.props.triggerChangeActiveId(id);
    }
    changeProfessorId(id) {
        this.props.triggerChangeProfessorId(id);
    }
    onChangeHandler(e){
        this.setState({
            input: e.target.value,
            page: 1,
        },
        this.componentDidMount);
    }
    onChange(current, pageSize){
        this.setState({
           page: current,
        }, this.componentDidMount)
    }
    onStaffEdit(id){
        this.changeActiveId(1);
        this.changeProfessorId(id);
    }
    componentDidMount(prevState) {
        fetch("https://si-echo-2019.herokuapp.com/api/si2019/echo/getTeachingStaff", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'page': this.state.page-1,
                'size': this.state.size,
                'search': this.state.input,
            })
        })
            .then(res => {return res.json()})
            .then(
                (result) => {
                    this.setState({
                        professorsList: result.content,
                        total: result.totalElements,

                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        var professors = this.state.professorsList
            .map((prof) => {
            return(
                <Fragment key={prof.id}>
                    <tr>
                        <td class="tabtip1">{prof.ime} {prof.prezime}</td>
                        <td class="tabtip1">{prof.email}</td>
                        <td class="tabtip1">{prof.titula}</td>
                        <td class="tabtip1"><a onClick={()=>this.onStaffEdit(prof.id)}><EditIcon/></a></td>
                    </tr>
                </Fragment>
            )
        });
        return (
            <div className="container">
                <div className="row search-teachers shadow-border">
                    <input id="searchTeachingStaff" type="text" placeholder="Search.." onChange={() => this.onChangeHandler.bind(this)}/>

                </div>
                <div className="row">
                    <table id="teachingStaffTable" className="table table-bordered table-hover professors-table shadow-border">
                        <thead>
                        <tr>
                            <th class="tabtip">Name</th>
                            <th class="tabtip">Email</th>
                            <th class="tabtip">Title</th>
                            <th class="tabtip"/>
                        </tr>
                        </thead>
                        <tbody>
                            {professors}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    id="pagination" className="pagination-table"
                    current={this.state.page}
                    total={this.state.total}
                    pageSize={this.state.size}
                    showPrevNextJumpers
                    locale={localeInfo}
                    onChange={() => this.onChange.bind(this)}
                />
            </div>
        );
    }
}

export default ProfessorsAvailability;
