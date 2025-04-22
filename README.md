# Todo App -- [[live]](https://isimeri.github.io/odin-todo-list/)

A todo app with persistent storage and projects functionality used to group together related todos.

![todo app screenshot](https://i.imgur.com/4fjII2X.png)
___
Click [here](https://isimeri.github.io/odin-todo-list/) to check out the live app.
___


## Operations
Todos can be created, read, updated and deleted. A project must be selected, however, before creating a todo. If, however, there is a filter selected(above the projects), the **default** project will be used to perform these operations.  
A new todo will get its background color set according to its priority: *red* for **high priority**, *yellow* for **medium priority** and *green* for **low priority**.  
Checking the "Done" box will grey out the todo to highlight that it's been completed.
## Projects
Used to group together related todos and they can only be created and viewed. There is a **default** project that's present by default. This project is used to perform create operations on todos when a filter is selected instead of a project.
## Filters
Used to display all the todos that meet a specific criteria.
  - **All Tasks** will display all the tasks.
  - **Today** will display all the tasks that are due today.

___
This project was created as part of [The Odin Project](https://www.theodinproject.com) full stack web developer course.
