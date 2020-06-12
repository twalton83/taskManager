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
        if (res.status === 200){
            window.location = res.url
        }
    })
}

incompleteBoxes.forEach((element) =>{
    element.addEventListener('click', completeTask)
})


