import { BaseService } from "./BaseService.js";

export class TaskServices extends BaseService {
    constructor(){
        super(); //gọi lại phương thức contructor của class cha
    }
    //định nghĩa phương thức getAllTask
    getAllTask = () => {
        return this.get('http://svcy.myclass.vn/api/ToDoList/GetAllTask');
    }

    // Định nghia hàm đưa dữ liệu về backend 
    addTask = (task) =>{
        return this.post('http://svcy.myclass.vn/api/ToDoList/AddTask',task);
    }

    //Định nghĩa hàm xóa dữ liệu
    deleteTask = (taskName) =>{
        return this.delete(`http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`)
    }
    //Xây dựng chức năng donetask
    doneTask = (taskName) =>{
        return this.put(`http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`)
    }
    //Xây dựng chức năng reject task
    rejectTask = (taskName) =>{
        return this.put(`http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`)
    }
}