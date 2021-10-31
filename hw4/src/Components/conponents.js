import React,{Component} from "react";
import '../index.css';

class Conponents extends Component {
  render() {
    return (
      <ul id="todo-list" className="todo-app__list">
        {this.props.items.map(item => (
          <li id={-item.id} key={item.id} className="todo-app__item"> 
          <div  id={item.id} className="todo-app__checkbox" onClick={()=>this.props.select(item.id) }  >
            <input type="checkbox"></input>
            <label  ></label>
          </div>
          <h1  className="todo-app__item-detail">{item.text}</h1>
          <img src="x.png" className="todo-app__item-x" onClick={()=>this.props.delete(item.id) }/>
          </li>
        ))}
      </ul>
    );
  }
  
}

export default Conponents;
