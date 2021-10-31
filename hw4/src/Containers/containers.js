import React,{Component} from "react";
import Conponents from "../Components/conponents";
import '../index.css';
class Containers extends Component {
    constructor(props){
      super(props);
      this.state={items:[],text:"",number:1,total:0,finish:0,unfinish:0}
      this.handlechange=this.handlechange.bind(this);
      this.handlesubmit=this.handlesubmit.bind(this);
      this.handleselect=this.handleselect.bind(this);
      this.handledelete=this.handledelete.bind(this);
      this.handleshowall=this.handleshowall.bind(this);
      this.handleshowactive=this.handleshowactive.bind(this);
      this.handleshowcompleted=this.handleshowcompleted.bind(this);
      this.handleclearcompleted=this.handleclearcompleted.bind(this);
      
    }
              

    
    componentDidUpdate(){
      if (this.state.finish+this.state.unfinish===0){
        document.getElementById("below").classList.add("hide");
       
      }
      else {document.getElementById("below").classList.remove("hide");}
      console.log(this.state.finish,this.state.unfinish)
      if (this.state.finish>0){
        document.getElementById("todo-app__clean").classList.remove("hidebutton");
        document.getElementById("todo-app__clean").classList.add("showbutton");
      }
      else {document.getElementById("todo-app__clean").classList.add("hidebutton");
      document.getElementById("todo-app__clean").classList.remove("showbutton");
    
    }
      
    }
    handlechange(e){
      this.setState({text:e.target.value})
    }
    handlesubmit(e){
      e.preventDefault();
      if (this.state.text.length===0){
        return;
      }
      let  newItem = {
        text: this.state.text,
        id: this.state.number,
        
       
      };
  
      
       
      this.setState(state => ({
        items: state.items.concat(newItem),
        text: "",
        number:state.number+1,
        total:state.total+1,
        unfinish:state.unfinish+1,

      }));
      
      
      
    
    }
    handleselect(e){
      if (!(document.getElementById(`${e}`).classList.contains("seleced"))){
      document.getElementById(`${e}`).classList.add("seleced");
      document.getElementById(`${-e}`).classList.add("finish");
      
      this.setState(state => ({
        finish: state.finish+1,unfinish:state.unfinish-1,
      }))}
      else {
      document.getElementById(`${e}`).classList.remove("seleced");
      document.getElementById(`${-e}`).classList.remove("finish");
      this.setState(state => ({
        finish: state.finish-1,unfinish:state.unfinish+1,
        
      }))}
      
      
    }
    handledelete(e){
      document.getElementById(`${-e}`).classList.add("delete");
      if (!(document.getElementById(`${e}`).classList.contains("seleced"))){
      this.setState(state => ({
        unfinish: state.unfinish-1
        
      }))}
      else {
        this.setState(state => ({
          finish: state.finish-1
          
      }))}
      
      
    }
    handleshowall(){
      let i ;
      for(i=1; i<=this.state.total ; i++){
        document.getElementById(`${-i}`).classList.remove("hide");}
     
      
      
      }
    handleshowactive(){
      let i ;
      for(i=1; i<=this.state.total ; i++){
        if (document.getElementById(`${i}`).classList.contains("seleced")){
        document.getElementById(`${-i}`).classList.add("hide");
        }
        else {document.getElementById(`${-i}`).classList.remove("hide")}
      }
      
      
    }
    handleshowcompleted(){
      let i ;
      for(i=1; i<=this.state.total ; i++){
        if (!(document.getElementById(`${i}`).classList.contains("seleced"))){
        document.getElementById(`${-i}`).classList.add("hide");
        }
        else {document.getElementById(`${-i}`).classList.remove("hide")}
      }
      
      
    }
    handleclearcompleted(){
      let i ;
      for(i=1; i<=this.state.total ; i++){
        if (document.getElementById(`${i}`).classList.contains("seleced") &&  
        (!(document.getElementById(`${-i}`).classList.contains("delete")))
        )
        
        {
        document.getElementById(`${-i}`).classList.add("delete");
        document.getElementById(`${i}`).classList.remove("seleced");
        this.setState(state => ({
          finish: state.finish-1
          
      }))
        }
      }
     
      
    }
    render(){
      return ( 
        <div class="todo-app__root">
          <header className="todo-app__header">
            <h1 className="todo-app__title">todos</h1>
          </header>
          <section className="todo-app__main">
          <form onSubmit={this.handlesubmit}>
            <input 
              id="todo-app__input" 
              className="todo-app__input" 
              onChange={this.handlechange} 
              value={this.state.text}
              onSubmit={this.handlesubmit}
              >
            </input>
            <Conponents items={this.state.items} select={this.handleselect} delete={this.handledelete}/>
           
          </form>
          </section>
          <div id ="below" className="hide">
          <footer id="todo-footer" className="todo-app__footer" >
                <div id="todo-app__total" className="todo-app__total">{this.state.unfinish}left(s)</div>
                <ul className= "todo-app__view-buttons">
                    <button onClick={this.handleshowall}>all</button>
                    <button onClick={this.handleshowactive}>active</button>
                    <button onClick={this.handleshowcompleted}>completed</button>
                </ul>
                <div id="todo-app__clean" className="todo-app__clean">
                    <button onClick={this.handleclearcompleted}>clear completed</button>
                </div>
            </footer>
          </div>
            
        
        </div>
      )
    }
  }
  
  
  
  export default Containers;
  