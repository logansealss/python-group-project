export function getDateFromToday(daysForward = 0) {
    let res = new Date();
    res.setDate(res.getDate() + daysForward)
    res = res.toISOString();
    res = res.slice(0, 10)
    return res;
}

export function getListDetailsFromList(tasks, listId) {

    let tasksToCheck = Object.values(tasks)

    let result = {
        overdueTasks: 0,
        estimatedTime: 0,
        tasks: [],
        completedTasks: []
    }

    const currentDate = getDateFromToday();

    return tasksToCheck.reduce((result, task) => {

        let taskDueDate = task.dueDate ? task.dueDate.slice(0, 10) : task.dueDate

        if (task.listId === listId) {
            if (task.completed) {
                result.completedTasks.push(task);
            } else {
                result.tasks.push(task)
                if (taskDueDate < currentDate) {
                    result.overdueTasks++;
                }
                if (task.duration > 0) {
                    result.estimatedTime += task.duration
                }
            }
        }

        return result
    }, result)
}

export function getListDetailsFromDates(tasks, startDate, dueDate) {

    let tasksToCheck = Object.values(tasks)

    let result = {
        overdueTasks: 0,
        estimatedTime: 0,
        tasks: [],
        completedTasks: []
    }

    const currentDate = getDateFromToday();

    return tasksToCheck.reduce((result, task) => {

        let taskDueDate = task.dueDate ? task.dueDate.slice(0, 10) : task.dueDate

        if (startDate === undefined
            || (taskDueDate >= startDate && taskDueDate <= dueDate)) {

            if (task.completed) {
                result.completedTasks.push(task)
            } else {
                result.tasks.push(task)
                if (task.duration > 0) {
                    result.estimatedTime += task.duration
                }
            }
        }

        if (taskDueDate < currentDate && dueDate !== getDateFromToday(1)) {

            if (task.completed) {
                result.completedTasks.push(task)
            } else {
                result.tasks.push(task)
                result.overdueTasks++;
                if (task.duration > 0) {
                    result.estimatedTime += task.duration
                }
            }
        }

        return result
    }, result)
}