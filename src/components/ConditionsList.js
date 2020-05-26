import React from "react";

export default class ConditionsList extends React.Component {
    constructor(props) {
        super(props);
         
        this.state = {
            cardArrayValue: []
        }

        this.ConditionInput = this.ConditionInput.bind(this);
    }

    ConditionInput(action, event, index, value) {
        var ConditionChange = this.state.cardArrayValue;
        switch (action) {
            case 'plusClick':
                ConditionChange[index].showIconDiv = !ConditionChange[index].showIconDiv;
                break;
            case 'rightClickAction':
                ConditionChange[index].rightIcon = !ConditionChange[index].rightIcon;
                ConditionChange[index].rightIconValue = 'plus';
                break;
            case 'buttonChanges':
                ConditionChange[index].condition = event.target.value === 'and' ? 'or' : 'and';
                break;
            case 'textChanges':
                ConditionChange[index].text = event.target.value;
                break;
            case 'removeItem':
                ConditionChange.splice(index, 1);
                break;
            case 'updateIconValue':
                ConditionChange[index].icon = event.currentTarget.getAttribute('attr');
                ConditionChange[index].showIconDiv = 'false';
                break;
            case 'dbClick':
                ConditionChange[index].readonly = !ConditionChange[index].readonly;
                break;
            case 'rightClickBrack':
                this.CheckConditionalOperator(event,index,value);
                ConditionChange[index].rightIconValue = event.currentTarget.getAttribute('attr');
                ConditionChange[index].rightIcon = 'false';
                break;
            default:
                break;
        }
        this.setState({ cardArrayValue: ConditionChange });
        this.DataStorage(ConditionChange);
    }

    CheckConditionalOperator(ev,index,currentValue) {
        let previosValue = document.querySelectorAll('.masterDiv .divToggleAndOr button');
        previosValue = previosValue[document.querySelectorAll('.masterDiv .divToggleAndOr button').length-2].value;
        var element = document.getElementById("drag"+index);
        element.classList.remove("borderbox");     
        if(currentValue == previosValue){
            element.classList.add("borderbox");     
            this.borderClassDiv =  '';
        }else{
            this.borderClassDiv =  'borderMainbox';
            element.classList.remove("borderbox");     
        }
    }

    componentDidMount(){
        if(localStorage.getItem("conditionValue") != null){
            let storedValue = JSON.parse(localStorage.getItem("conditionValue"));
            this.setState({ cardArrayValue: storedValue });      
        }  
    }

    DataStorage(value) {
        localStorage.setItem("conditionValue",JSON.stringify(value));
    }

    AddNewcondition = () => {
        this.borderClassDiv =  '';
        var cardChanges = this.state.cardArrayValue;
        if(cardChanges.length > 6){
            alert("Card level reached.");
            return true;
        }
        cardChanges.push({ text: 'New Condition', condition: 'and', icon: 'plus', showIconDiv: true, rightIcon: true, rightIconValue: 'plus', readonly: false});
        this.setState({ cardArrayValue: cardChanges });
    }

    AllowDrop = (ev) => {
        ev.preventDefault();
    }

    Drag = (ev) => {
        ev.dataTransfer.setData("src", ev.target.id);
    }

    Drop = (ev) => {
        ev.preventDefault();
        var src = document.getElementById(ev.dataTransfer.getData("src"));
        var srcParent = src.parentNode;
        var tgt = ev.currentTarget.firstElementChild;
        ev.currentTarget.replaceChild(src, tgt);
        srcParent.appendChild(tgt);
    }

    render() {
        let { cardArrayValue } = this.state;
        return (
            <div className="col">
                {
                    cardArrayValue.length > 0 ? 
                    <div className="">
                        <div className="btnCondList" onClick={() => this.AddNewcondition()}>
                            <a href="#"><i className="fa fa-plus" aria-hidden="true" ></i> New Condition</a></div>
                        <div className={this.borderClassDiv}>
                        {
                            cardArrayValue.map((item, index) => (
                                <div className="masterDiv" key={index}>
                                    <div id={'div' + index} onDrop={this.Drop} onDragOver={this.AllowDrop}>
                                        <div id={'drag' + index} draggable="true" onDragStart={this.Drag} className="">
                                            <div className="row condition-list border">
                                                <div className="col-md-2 left-plus-icon">
                                                    <span className={item.showIconDiv ? 'Show' : 'Hide'}>
                                                        {item.icon != 'other' ?
                                                            <a href="#" onClick={(event) => this.ConditionInput('plusClick', event, index)}><i className={'fa fa-' + item.icon + ' Icon'} aria-hidden="true" ></i></a>
                                                            : <a onClick={(event) => this.ConditionInput('plusClick', event, index)} href="#" className="Icon" value="other"> ( </a>
                                                        }
                                                    </span>
                                                    <span className={item.showIconDiv ? 'Hide' : 'Show'}>
                                                        <a href="#" onClick={(event) => this.ConditionInput('removeItem', event, index)} ><i id={index} className="fa fa-ban Icon " aria-hidden="true" ></i></a>
                                                        <a href="#" attr="exclamation" onClick={(event) => this.ConditionInput('updateIconValue', event, index)} ><i className="fa fa-exclamation Icon" aria-hidden="true" ></i></a>
                                                        <a href="#" attr="other" onClick={(event) => this.ConditionInput('updateIconValue', event, index)} className="Icon"> (</a>
                                                    </span>
                                                </div>
                                                <div className='col-md-8 mobilesmcenter'>
                                                    <input maxLength="25" type="text" id={'inputValue_'+index} key={index} value={item.text} className="Input-field " onChange={(event) => this.ConditionInput('textChanges', event, index)} name="data" readOnly={item.readonly} onDoubleClick={(event) => this.ConditionInput('dbClick', event, index)} />
                                                </div>
                                                <div className="col-md-2 right-plus-icon">
                                                    <span className={item.rightIcon ? 'Show' : 'Hide'}>
                                                        {item.rightIconValue != 'other' ?
                                                            <a href="#" onClick={(event) => this.ConditionInput('rightClickPlus', event, index)}><i className={'fa fa-' + item.rightIconValue + ' Icon'} aria-hidden="true" ></i></a>
                                                            : <a href="#" onClick={(event) => this.ConditionInput('rightClickPlus', event, index)} className="Icon" value="other"> ) </a>
                                                        }
                                                    </span>
                                                    <span className={item.rightIcon ? 'Hide' : 'Show'}>
                                                        <a href="#" onClick={(event) => this.ConditionInput('rightClickAction', event, index)} ><i id={index} className="fa fa-ban Icon " aria-hidden="true" ></i></a>
                                                        <a attr="other" onClick={(event) => this.ConditionInput('rightClickBrack', event, index, item.condition)} href="#" > ) </a>
                                                    </span>
                                                </div>
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="text-center divToggleAndOr">
                                        <button type="button" className="btn shadow-sm mb-5 bg-white rounded btnToggleAndOr" onClick={(event) => {this.ConditionInput('buttonChanges', event, index)}} value={item.condition}>{item.condition}</button>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                    </div> : 
                    <div className="col conditions-new-1">
                        <button className="btn btn-light" style={{color: "#1fc5f7"}} onClick={()=>{this.AddNewcondition()}}>+ New Condition</button>
                    </div>
                }
            </div>
        )
    }
}