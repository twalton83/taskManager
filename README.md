# TASK.ME #

A MongoDB, Express, and NodeJS task manager, using passport local strategy for registration and log-ins. 

## Features : ##

- [X] Link tasks to users

- [ ] make a "Change Password" function

- [ ] make due dates visible

- [ ] add a description area.
    - [ ] add a new task.ejs view to display more information for individual tasks
    - [ ] potentially create modal for this, linked to _id of task


## Bugs : ##

- [ ] Fix the way tasks are fetched from the database. Currently, tasks with the same name are bugged when you attempt to complete them as it returns the one with the same name that was generated first. 
