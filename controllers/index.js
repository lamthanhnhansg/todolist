import {TaskServices} from "../services/TaskServices.js";
import {Task} from "../models/Task.js"

const taskSV = new TaskServices();

const getAllTask = async() => {
    try{
        const result = await taskSV.getAllTask();
        console.log("Result data: " , result.data);

        let taskToDo = result.data.filter(task => task.status === false)
        console.log(taskToDo);
        randerTaskToDo(taskToDo);

        let taskCompleted = result.data.filter(task => task.status === true)
        console.log(taskCompleted);
        randerTaskCompleted(taskCompleted);
    }catch(err){
        console.log(error);
    }
}
const randerTaskToDo = (taskToDo) => {
    const content = taskToDo.reduce((content, item, index) =>{
        return content += `
        <li>
            <div>${item.taskName}</div>
            <div>
                <span class="buttons" style="cursor: pointer;" >${item.taskName}<i class="fa fa-trash"></i></span>
                <span class="buttons" style="cursor: pointer;" onclick="delTask('${item.taskName}')"><i class="fa fa-check"></i></span>
                <span class="buttons" style="cursor: pointer;" onclick="doneTask('${item.taskName}')"><i class="fa fa-angle-down"></i></span>
            </div>
        </li>`
    },"")
    document.getElementById("todo").innerHTML = content;
}

const randerTaskCompleted = (taskCompleted) => {
    const content = taskCompleted.reduce((content, item, index) =>{
        return content += `
            <li>
                <div>${item.taskName}</div>
                <div>
                    <span class="buttons" style="cursor: pointer;">${item.taskName}<i class="fa fa-trash"></i></span>
                    <span class="buttons" style="cursor: pointer;" onclick="rejectTask('${item.taskName}')"><i class="fa fa-undo"></i></span>
                </div>
            </li>`
    },"")
    document.getElementById("completed").innerHTML = content;
}
getAllTask();
//định nghĩa sự kiện cho nút xóa
window.delTask = async (taskName) => {

    let cfm = confirm('Ban co muon xoa task ?');
    if(cfm){
        //Gọi api mỗi lần người dùng bấm nút xóa dữ liệu
        try{
            let result = await taskSV.deleteTask(taskName);

            console.log(result.data);
            //Gọi lại hàm get task sau khi xóa
            getAllTask();
        }catch (err) {
            console.log(err);
        }
    }
    
}
//Định nghĩa sự kiện reject
window.rejectTask = async (taskName) => {

    let cfm = confirm('Ban co muon reject task ?');
    if(cfm){
        //Gọi api mỗi lần người dùng bấm nút reject
        try{
            let result = await taskSV.rejectTask(taskName);

            console.log(result.data);
            //Gọi lại hàm get task sau khi reject
            getAllTask();
        }catch (err) {
            console.log(err);
        }
    }
    
}
//Định nghĩa sự kiện done
window.doneTask = async (taskName) => {

    let cfm = confirm('Ban co muon done task ?');
    if(cfm){
        //Gọi api mỗi lần người dùng bấm nút done
        try{
            let result = await taskSV.doneTask(taskName);

            console.log(result.data);
            //Gọi lại hàm get task sau khi done
            getAllTask();
        }catch (err) {
            console.log(err);
        }
    }
    
}


//========================== Nghiep vu them task ====================>
// B1 Định nghĩa sự kiện click cho button #additem
document.getElementById('addItem').onclick = async (even)=>{
    // even.preventDefault(); // Chặn sư kiện hiện tại của thẻ submit hay thẻ href thẻ a
    // even.Target <= đại diện cho button đang được click
    // Lấy thông tin người dùng nhập từ giao diện
    let inputTaskName = document.getElementById('newTask').value;
    // Tạo ra object backend yêu cầu 
    const taskModel = new Task();
    taskModel.taskName =  inputTaskName;
    try{
        let result = await taskSV.addTask(taskModel);
        alert('Đã thêm thành công' , result.data);
        // sau khi thêm thành công gọi hàm getAllTask để load lại list
        getAllTask();
        
    }catch(err){
        console.log(err);
    }

}
 //======================== nghiệp vụ xóa dữ liệu =========================

 // Viết chức năng tìm kiếm
 let searchTask = (task) => {
    console.log(task);
 }