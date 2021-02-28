import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import LeftMenuStudent from './komponente/Student/LeftMenuStudent.js';
import IssueList from './komponente/Student/issueList.js';
import FAQ from './komponente/Student/FAQ.js';
import Drafts from './komponente/Student/Drafts.js';
import Archived from './komponente/Student/ArchivedPart.js'

import LeftMenuSS from './komponente/SS/LeftMenuSS.js';
import IssueListSS from './komponente/SS/IssueListSS.js';
import FAQSS from './komponente/SS/SSFAQ.js';
import DraftsSS from './komponente/SS/Drafts.js';
import ArchivedSS from './komponente/SS/ArchivedPart.js'
import { standardHeaders } from './komponente/helpers/getStandardHeaders'


const ROLES = {
  STUDENT: 'STUDENT',
  STUDENTSKA_SLUZBA: 'STUDENTSKA_SLUZBA'
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeContentId: 1,
      role: ROLES.STUDENT,
      loading: true,
      error: false
    };
  }

  componentDidMount() {
    this.initialMount()
  }

  onChangeActiveId = (id) => {
    this.setState({
      activeContentId: id,
    })
  };

  initialMount = async () => {
    try {
      const res = await axios.get('https://si2019beta.herokuapp.com/authenticate', standardHeaders())
      const uloga = res.data.uloga
      if (uloga === ROLES.STUDENT || uloga === ROLES.STUDENTSKA_SLUZBA) {
        this.setState({
          role: uloga,
          loading: false,
          error: null
        })
      }else{
        this.setState({
          role: uloga,
          loading: false,
          error: true
        })
      }
    } catch (e) {
      if (e.response && e.response.status === 405) {
        this.setState({
          loading: false,
          error: true
        })
      } else {
        this.setState({
          loading: false
        })
        // window.localStorage.removeItem('token')
        // window.localStorage.removeItem('id')
        // window.localStorage.removeItem('username')

        // window.location.href = '/romeo'
      }
    }
  }

  render() {
    const { open, role, loading, error } = this.state;
    if (loading) {
      return (
        <div
          style={{
            height: 'calc(100vh - 80px)'
          }}
        >
          Loading...
      </div>
      )
    }

    if (error) {
      return (
        <div style={{
          height: 'calc(100vh - 80px)'
        }}>
          Nemate privilegiju da pristupite ovoj stranici.
        </div>
      )
    }
    return (
      <div >

        <div className="App">

          <div className="row">
            <div id="mainBeta">
              <div id="leftBeta">
                {
                  role === ROLES.STUDENT && <LeftMenuStudent triggerChangeActiveId={this.onChangeActiveId} />
                }
                {
                  role === ROLES.STUDENTSKA_SLUZBA && <LeftMenuSS triggerChangeActiveId={this.onChangeActiveId} />
                }
              </div>
              <div id="rightBeta">

                <div
                  id="TrackIssuesContent"
                  style={{ display: this.state.activeContentId == 1 ? 'inherit' : 'none' }}
                >
                  {
                    role === ROLES.STUDENT && <IssueList />
                  }
                  {
                    role === ROLES.STUDENTSKA_SLUZBA && <IssueListSS />
                  }

                </div>
                <div
                  id="DraftsContent"
                  style={{ display: this.state.activeContentId == 2 ? 'inherit' : 'none' }}
                >
                  {
                    role === ROLES.STUDENT && <Drafts />
                  }
                  {
                    role === ROLES.STUDENTSKA_SLUZBA && <DraftsSS />
                  }
                </div>
                <div
                  id="Archived"
                  style={{ display: this.state.activeContentId == 3 ? 'inherit' : 'none' }}
                >
                  {
                    role === ROLES.STUDENT && <Archived />
                  }
                  {
                    role === ROLES.STUDENTSKA_SLUZBA && <ArchivedSS />
                  }
                  {/* <Archived /> */}
                </div>

                <div
                  id="FAQContent"
                  style={{ display: this.state.activeContentId == 4 ? 'inherit' : 'none' }}
                >
                  {
                    role === ROLES.STUDENT && <FAQ />
                  }
                  {
                    role === ROLES.STUDENTSKA_SLUZBA && <FAQSS />
                  }
                  {/* <FAQ /> */}
                </div>



              </div>
            </div>

          </div>



        </div>

      </div>
    );
  }
}

export default App;