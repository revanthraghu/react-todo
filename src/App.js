import React from 'react'
import Task from './components/Task'
import styles from './App.module.css'
import {v4 as uuid} from 'uuid'
// Each todo list item can be crossed out after completion by clicking on it.
// A green color should be given to the list if completed
// There should be a button Show Completed Todos that will show completed todos.

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      input: '',
      show : false
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showTodo = this.showTodo.bind(this)
    this.updateData = this.updateData.bind(this)
    this.showCompleted = this.showCompleted.bind(this)
  }

  handleChange(e) {
    this.setState(
      { input: e.target.value }
    )
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState(prevState => ({todo: [...prevState.todo, {task: this.state.input, id: uuid(), done: false, favourite: false}]}))
  }

  updateData(id, data, action, done, cancel) {
    if(action === 'edit') {
      this.setState(prevState =>  {
        let arr = Array.from(prevState.todo)
        for(var i = 0; i < arr.length; i++) {
          if(arr[i].id === id) {
            arr[i].task = data
            break
          }
        }
        return ({todo: arr})
      })
    }
    else if(action === 'favourite') {
      this.setState(prevState =>  {
        let arr = Array.from(prevState.todo)
        for(var i = 0; i < arr.length; i++) {
          if(arr[i].id === id) {
            arr[i]["favourite"] = !arr[i].favourite
            break
          }
        }
        return ({todo: arr})
      })
    }
    else if(action === 'cancel') {
      this.setState(prevState =>  {
        let arr = Array.from(prevState.todo)
        for(var i = 0; i < arr.length; i++) {
          if(arr[i].id === id) {
            arr.splice(i,1)
            break
          }
        }
        return ({todo: arr})
      })
      //this.forceUpdate()
    }
    else if(action === 'done') {
      this.setState(prevState =>  {
        let arr = Array.from(prevState.todo)
        for(var i = 0; i < arr.length; i++) {
          if(arr[i].id === id) {
            arr[i]["done"] = !arr[i].done
            break
          }
        }
        return ({todo: arr})
      })
    }
    else return
  }

  showTodo() {
    if(this.state.todo.length !== 0) {
      return (this.state.todo.filter((item) => item.done === false).map((item)=><Task key={item.id} task={item.task} done={item.done} id={item.id} favourite={item.favourite} updateData={this.updateData}/>))
    }
    else return null
  }

  showCompleted() {
    if(this.state.todo.length !== 0) {
      let completed_list = this.state.todo.filter((item) => item.done === true)
      if(completed_list.length !== 0 && this.state.show === true) {
        return (
          <div className={styles.completed}>
            <button 
            style={{border: '1px solid green', borderRadius: '4px', color: 'white', background: '#4e8949', padding: '5px 20px', opacity: '0.9', cursor: 'pointer'}} 
            onClick={(e)=>{this.setState({show: false})}}>
              Hide
            </button>
            {completed_list.map((item)=><Task key={item.id} task={item.task} id={item.id} done={item.done} favourite={item.favourite} updateData={this.updateData}/>)}
          </div>
        )
      }
      else if(completed_list.length !== 0 && this.state.show === false){
        return (<div className={styles.completed}>
                  <button 
                  style={{border: '1px solid green', borderRadius: '4px', color: 'white', background: '#4e8949', padding: '5px 20px', opacity: '0.9', cursor: 'pointer'}} 
                  onClick={(e)=>{this.setState({show: true})}}>
                    Show
                  </button>
                </div>
              )
      }
      else if(completed_list.length === 0 && this.state.show === true) {
        this.setState({show: false})
        return null
      } 
    }
    return null
  }

  render() {
    return (
    <div className={styles.body}>
      <div style={{position: "relative", marginTop: "15vh", marginBottom: "5vh"}}>
        <i className={`fas fa-plus ${styles.plusSymbol}`}></i>
        <form onSubmit={this.handleSubmit}>
          <input className={styles.input} type="text" placeholder="Add a to-do..." onChange={this.handleChange} value={this.state.input}/>
        </form>
      </div>
      {this.showTodo()}
      {this.showCompleted()}
    </div>
    )
  }
  
}

export default App
