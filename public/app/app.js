let incompleteBoxes = document.querySelectorAll('.checkbox.material-icons.small')

const completeTask = (e) =>{
    const taskTitle = e.target.parentElement.children[0].textContent
    fetch('/tasks/completeTask', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },    
        body: JSON.stringify({
            title : taskTitle
        })
    })
    .then((res) =>{
        console.log(res)
        if (res.status === 301 || res.status === 302){
            window.location = res.headers.location
        }
    })
}

incompleteBoxes.forEach((element) =>{
    element.addEventListener('click', completeTask)
})


