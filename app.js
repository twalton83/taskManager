

const addTaskBtn = document.querySelector('.btn-floating')

class Task {
    constructor(text, completion){
        this.text = text;
        this.completion = completion;
    }
}
class TaskUI {
    addTaskToList(task){
        const taskListCollection = document.querySelector('.collection.incomplete');
        const newTask = document.createElement('li')
        newTask.innerHTML = `<p class= "task">${task.text}</p><i class = "checkbox material-icons small">check_box_outline_blank</i>`; 
        taskListCollection.appendChild(newTask)
    }
    moveCompletedTask(task){

        console.log(task)
        const tasks = Store.getTasks();
        tasks.forEach((storedTask) =>{
            if(storedTask.text === task){
                const completedTaskCollection = document.querySelector('.collection.complete')
                const newCompletedTask = document.createElement('li');
                newCompletedTask.innerHTML = `<p class= "task">${storedTask.text}</p><i class = "checkbox material-icons small">check_box_outline_filled</i>`;
                console.log(newCompletedTask)
                completedTaskCollection.append(newCompletedTask)
            }
        })
       
    }

    addCompletedTask(task){
        const completedTaskCollection = document.querySelector('.collection.complete')
        const newCompletedTask = document.createElement('li');
        newCompletedTask.innerHTML = `<p class= "task">${task.text}</p><i class = "checkbox material-icons small">check_box_outline_filled</i>`;
        console.log(newCompletedTask)
        completedTaskCollection.append(newCompletedTask)
    }

    static clearField(){
        document.querySelector('#taskInput').value = ''
    }

   
}

class Store {
    static getTasks(){
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'))
        }
        return tasks
    }

    static displayTasks(){
        const tasks = Store.getTasks();

        tasks.forEach((task) =>{
            if(task.completion === false){
                const ui = new TaskUI;
                ui.addTaskToList(task)
            }
        })
    }

    static addTask(task){
        const tasks = Store.getTasks();
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    static completeTask(text){
        const tasks = Store.getTasks();
        tasks.forEach((task) =>{
            if(task.text === text){
                task['completion'] = true;
                console.log(task, " : completion")
            }
        })
        localStorage.setItem('tasks', JSON.stringify(tasks))

    }

    static displayCompletedTasks(){
        const tasks = Store.getTasks();
        tasks.forEach((task) =>{
            if(task.completion === true){
                const ui = new TaskUI;
                ui.addCompletedTask(task)
            }
        })
    }
}

document.addEventListener('DOMContentLoaded', Store.displayTasks())
document.addEventListener('DOMContentLoaded', Store.displayCompletedTasks())


const addTask = () =>{
    const text = document.querySelector(`input[type=text]`).value;
    if(text === ''){
        return
    } else{
        const task = new Task(text)

        const ui = new TaskUI();
        task.completion = false;
        ui.addTaskToList(task)
        Store.addTask(task)
        TaskUI.clearField()
    }
}

addTaskBtn.addEventListener('click', addTask)

document.querySelector(`input[type=text]`).addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addTask()
    }
});


document.querySelector('.collection.incomplete').addEventListener('click', (e)=>{
    if(e.target.className === "checkbox material-icons small"){
        e.target.parentElement.remove();
    }
    const ui = new TaskUI();
   ui.moveCompletedTask(e.target.parentElement.firstChild.textContent) 
   Store.completeTask(e.target.parentElement.firstChild.textContent)
})