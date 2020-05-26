import React, { Component } from 'react';
import "./App.css";

import ConditionsList from "./components/ConditionsList";
import Description from './components/Description';

class App extends Component {
  constructor() {
    super();

    this.state = {
      selectedBtn : "conditions"
    }
    this.btnClick = this.btnClick.bind(this);
  }
  
  btnClick(btnName) {
    if (btnName === 'description') {
      this.refs.description.classList.add('active')
      this.refs.conditions.classList.remove('active')
    } else {
      this.refs.conditions.classList.add('active')
      this.refs.description.classList.remove('active')
    }
    this.setState({
      selectedBtn : btnName
    })
  }

  render() {
    let { selectedBtn } = this.state;
    return (
        <div className="container">
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6 Center border" style={{backgroundColor:"lightgray"}}>
              <span className="paddingLeft">If node space test <span className="TextAlign"><i className="fa fa-close"></i></span></span>
                  <span className="transform">
                    <div className="box">
                      <span className="Ifclass"></span>
                      <div className="text">
                        IF
                      </div>
                    </div>&nbsp;
                    <span className="">   If node </span>
                  </span>
              <div className="row btn-sel">
                <button ref="conditions" type="button" className="col btn btn-outline-secondary active" onClick={(e)=>this.btnClick('conditions')}>Conditions</button>
                <button ref="description" type="button" className="col btn btn-outline-secondary" onClick={(e)=>this.btnClick('description')}>Description</button>
              </div>
              <div className="row conditions-new">
              {
                selectedBtn === 'conditions' ? <ConditionsList /> : <Description />
              }
            </div>
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
    );
  }
}

export default App;
