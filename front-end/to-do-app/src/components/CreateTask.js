import React, { Component } from 'react';
import TaskService from '../services/TaskService';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
class CreateTask extends Component {
    constructor(props){
        super(props)

        this.state={
            id: this.props.match.params.id,
            task:''
        }
        this.changeTaskHandler=this.changeTaskHandler.bind(this)
        this.saveOrUpdateTask=this.saveOrUpdateTask.bind(this)
        this.cancel = this.cancel.bind(this);
    }

    saveOrUpdateTask=(e)=>{
        let taskObj={
            task:this.state.task
        }
        if(this.state.id==="_add"){
            TaskService.createTask(taskObj)
            .then((res)=>{
                this.props.history.push('/task')
            })
        }

    }
    cancel() {
        
        this.props.history.push('/task'); 
      }
      changeTaskHandler(event) {
        this.setState({ task: event.target.value });
      }
    componentDidMount(){
        if(this.state.id==="_add"){
            return
        }
        else{
            TaskService.getTaskById(this.state.id)
            .then((res)=>{
                let taskData=res.data
                this.setState({
                    task:taskData.task
                })
            })
        }
    }
    render() {
        return (
            <div>
               <TextField id="standard-basic" variant="standard" onChange={this.changeTaskHandler}/>
               <br/><br/> 
               <Button variant="outlined" color="success" onClick={this.saveOrUpdateTask}>
                Save
               </Button>
            <Button variant="outlined" color="error" onClick={this.cancel.bind(this)}>
              Cancel
            </Button>
            </div>
        );
    }
}

export default CreateTask;