
let incompleteBoxes = document.querySelectorAll('.incomplete.checkbox.material-icons.small')
let completeBoxes = document.querySelectorAll('.complete.checkbox.material-icons.small')

let deleteIcons = document.querySelectorAll('.delete')

const completeTask = (e) =>{
    const taskId = e.target.parentElement.parentElement.firstElementChild.dataset.id
    fetch('/tasks/completeTask', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },    
        body: JSON.stringify({
            id : taskId,

        })
    })
    .then((res) =>{
        if (res.status === 200){
            window.location = res.url
        }
    })
}

incompleteBoxes.forEach((element) =>{
    element.addEventListener('click', completeTask)
})


const incompleteTask = (e) =>{
    const taskId = e.target.parentElement.parentElement.firstElementChild.dataset.id
    fetch('/tasks/incompleteTask', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },    
        body: JSON.stringify({
            id : taskId,

        })
    })
    .then((res) =>{
        if (res.status === 200){
            window.location = res.url
        }
    })
}

completeBoxes.forEach((element) =>{
    element.addEventListener('click', incompleteTask)
})


const deleteTask = (e) =>{
    const taskId = e.target.parentElement.parentElement.firstElementChild.dataset.id;
    fetch(`/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },    
        body: JSON.stringify({
            id : taskId,
        })
    })
    .then((res) =>{
        window.location.href = '/tasks'
    })
}

deleteIcons.forEach((element) =>{
    element.addEventListener('click', deleteTask)
})