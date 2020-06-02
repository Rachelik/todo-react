import React from 'react';
import { hot } from 'react-hot-loader';
import classnames from 'classnames';
import styles from './style.scss';
import moment from 'moment';
const cx = classnames.bind(styles)
// import Form from './components/form/form';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      newItem: "",
      list: [],
      count: 0,
      previousValues: [],
      error: ""
    };
  };

  updateInput(key, value) {
    this.setState({
      [key]: value
      // newItem: event.target.value
    });
  };

  clickHandler(){
    let num = this.state.count+1;

    const newItem={
      id: num,
      value: this.state.newItem,
      date: moment().format('MMMM Do YYYY, h:mm:ss a')
    };

    const currentList = [newItem, ...this.state.list];

    let updateObj = {
      count: num,
      list: currentList,
      newItem:""
    };

    let message = "";
    this.setState({
      error: message
    });

    let itemLength = newItem.value.length;
    if (itemLength > 1 && itemLength < 200) {
      this.setState(updateObj);
    } else {
      message = "Input length error (Enter at least 1 character and less than 200 characters)"
      this.setState({
        error: message
      });
    };
  };

  deleteItem(id){
    const list = [...this.state.list];
    const updatedList = list.filter(item => item.id != id);
    this.setState({list: updatedList});
  }
  render() {
    return (
      <div className="App">
        <input type="text" className="input-field"
          value={this.state.newItem}
          onChange={(event) => this.updateInput("newItem", event.target.value)}
        />
        <Form clickHandler={()=>{this.clickHandler()}} newItem={this.state.newItem}/>
        <p className="error-message">{this.state.error}</p>
        <br/>

        <ItemList list={this.state.list} deleteItem={this.deleteItem}/>
      </div>
    );
  }
}

class Form extends React.Component {
  render() {
    return (
      <div>
        <button className="submit-btn" onClick={()=>this.props.clickHandler()}>
          Add Item
        </button>
      </div>
    );
  }
}

class ItemList extends React.Component{
  render(){
    const listElements = this.props.list.map((item)=>{
      return(
        <li key={item.id}>
          <div className="each-list">
            <div className="btn-check">
              <button onClick = {() => {this.props.deleteItem(item.id)}}>
                X
              </button>
            </div>
            <div className="item-description">
              {item.value}
            </div>
            <div className="created-date">
              {item.date}
            </div>
          </div>
        </li>
      )
    });
    return (
      <div>
        <ul className="to-do-list">
          {listElements}
        </ul>
      </div>
    );
  }
}

export default hot(module)(App);
