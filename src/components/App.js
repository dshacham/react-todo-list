import React, { Component } from 'react'
import '../css/App.scss'
import Navigation from './Navigation'
import ToDosContainer from './ToDosContainer'
import ToDonesContainer from './ToDonesContainer'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Help from '../views/Help'
import PageNotFound from '../views/PageNotFound'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  };

  componentDidMount() {
    // fetch data from local storage:
    let data = localStorage.getItem('todo-list');
    // parse back into object:
    let dataFromLS = JSON.parse(data);
    // if the local storage is not empty, set the state of items to the data from it:
    if (dataFromLS !== null) {
      this.setState({ items: dataFromLS });
    }
  }

  updateItem = (id) => {
    let newState = this.state.items.map(item => {
      if (item.id === id) {
        item.done = !item.done;
        return item;
      } else {
        return item;
      };
    });
    this.setState({
      items: newState
    }, () => { localStorage.setItem("todo-list", JSON.stringify(this.state.items)) });
  };

  addItem = (newItem) => {
    let item = { id: this.state.items.length, text: newItem, done: false }
    this.setState({
      items: [...this.state.items, item]
      // storing data in local storage as a callback since setState is asynchronous code and will run after if not set like this:
    }, () => { localStorage.setItem("todo-list", JSON.stringify(this.state.items)) });
  }

  render() {
    const toDos = /*check if there's something in the array =>*/ this.state.items && /*<=if there's something in there, run this code =>*/ this.state.items.filter(el => !el.done);
    const toDones = this.state.items && this.state.items.filter(el => el.done);

    return (
      <BrowserRouter>
        <div className='app'>
          <Navigation />
          <Switch>
            <Route path='/' exact>
              <ToDosContainer items={toDos} updateItem={this.updateItem} addItem={this.addItem} />
              <ToDonesContainer items={toDones} updateItem={this.updateItem} />
            </Route>
            <Route path='/help' exact>
              <Help />
            </Route>
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  };
};
