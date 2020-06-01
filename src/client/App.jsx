import React from 'react';
import { hot } from 'react-hot-loader';
import moment from 'moment';

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
    });
  };

  clickHandler(){
    let num = this.state.count+1;

    const newItem={
      id: num,
      value: this.state.newItem,
      date: moment().format()
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

    const listElements = this.state.list.map((item)=>{
        return(
          <li key={item.id}>
            <div className="each-list">
              <div className="btn-check">
                <button onClick = {() => this.deleteItem(item.id)}>
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
      <div className="App">
        <div>
          <input type="text" className="input-field"
            value={this.state.newItem}
            onChange={e => this.updateInput("newItem", e.target.value)}
          />
          <button className="submit-btn" onClick={()=>this.clickHandler()}>
            Add Item
          </button>

          <p className="error-message">{this.state.error}</p>
          <br/>

          <h3 className="heading-three">To do list</h3>
          <ul className="to-do-list">
            {listElements}
          </ul>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
