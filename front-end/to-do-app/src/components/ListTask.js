import React, { Component } from 'react';
import TaskService from '../services/TaskService';
import {List,ListItem,ListItemText,Button,IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
class ListTask extends Component {
    constructor(props){
        super(props)
        this.state={
            tasks:[]
        }
        this.addTask=this.addTask.bind(this)
        this.editTask=this.editTask.bind(this)
        this.deleteTask=this.deleteTask.bind(this)
    }
    deleteTask(id){
        TaskService.deleteTask(id)
        .then((res)=>{
            this.setState({tasks:this.state.tasks.filter(task=>task.id!==id)})
        })
    }
    editTask(id){
        this.props.history.push(`/update-task/${id}`)
    }

    addTask(){
        this.props.history.push(`/add-task/_add`)
    }
    componentDidMount(){
        TaskService.getTasks().then((res)=>{
            if(res.data==null){
                this.props.history.push('/add-task/_add')
            }
            this.setState({tasks:res.data})
        })
    }

   
    render() {
        return (
            <div>
                
                <Button variant="contained" color="success" onClick={this.addTask}  startIcon={<AddIcon />}>
  Add Task
</Button>
                <Box sx={{width: 300,
        height: 300}}>
                <List>
                    {this.state.tasks.map(task =>
                    <>
                    <ListItem key={task.id} secondaryAction={
                        <div>
                        <IconButton color="error" onClick={()=>this.deleteTask(task.id)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton color="secondary" onClick={()=>this.editTask(task.id)}><EditIcon/></IconButton>
                        </div>
                      }>
                        
                        <ListItemText primary={task.task}/>
                        
                    </ListItem><Divider /></>
                    )}
    
                </List></Box>
                {/* dsigbuisdb
               { this.state.tasks.map(taskabc => 
                    <div key={taskabc.id}>{taskabc.task}</div>

                )} */}
                
            </div>
        );
    }
}

export default ListTask;