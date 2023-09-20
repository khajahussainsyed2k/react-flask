import axios from 'axios'

const API_URL='http://127.0.0.1:5000/tasks'

class TaskService{
    getTasks(){
        return axios.get(API_URL)
    }
    createTask(task){
        return axios.post(API_URL,task)

    }
    updateTask(task,taskId){
        return axios.put(API_URL+ "/"+taskId,task)
    }
    deleteTask(taskId){
        return axios.delete(API_URL+"/"+taskId)
    }
    getTaskById(taskId){
        return axios.get(API_URL+"/"+taskId)
    }
}
export default new TaskService()