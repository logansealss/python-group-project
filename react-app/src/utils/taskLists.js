import { Redirect } from 'react-router-dom';

export function getDateFromToday(daysForward = 0) {
    let res = new Date();
    res.setDate(res.getDate() + daysForward)
    res = res.toISOString();
    res = res.slice(0, 10)
    return res;
}

function stringIncludesArr(string, arr) {

    const lowercaseString = string.toLowerCase()

    for (const testStr of arr) {
        if (lowercaseString.includes(testStr.toLowerCase())) {
            return true;
        }
    }
    return false;
}

export function getListDetailsFromSearch(tasks, searchArr) {
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

        if (stringIncludesArr(task.name, searchArr)) {
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

export function getListDetailsFromTag(tasks, tagId) {

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

        if (task.tags.includes(tagId)) {
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

export function getListDetailsFromDates(tasks, startDate, dueDate, showCompleted=false) {

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

        if (!startDate
            || (taskDueDate >= startDate && taskDueDate <= dueDate)) {

            if (task.completed) {
                if (showCompleted) {
                    result.tasks.push(task)
                    if (task.duration > 0) {
                        result.estimatedTime += task.duration
                    }
                };
                result.completedTasks.push(task)
            } else {
                if (!showCompleted) {
                    result.tasks.push(task)
                    if (task.duration > 0) {
                        result.estimatedTime += task.duration
                    }
                };
            };
        } else if (taskDueDate < currentDate && dueDate !== getDateFromToday(1)) {

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

export function getListDetails({listId, filterId}, tasks, lists, tags) {

    const baseListId = listId;

    listId = listId ? listId.toLowerCase() : listId
    filterId = filterId ? filterId.toLowerCase() : filterId

    let listDetails = null;
    let taskObj = tasks ? tasks : {};

    if (filterId === 'lists') {

        if (listId === "all" || listId === undefined) {
            listDetails = getListDetailsFromDates(taskObj)
            listDetails.name = "All Tasks"
        } else if (listId === "today") {
            listDetails = getListDetailsFromDates(taskObj, getDateFromToday(), getDateFromToday())
            listDetails.name = "Today"
        } else if (listId === "tomorrow") {
            listDetails = getListDetailsFromDates(taskObj, getDateFromToday(1), getDateFromToday(1))
            listDetails.name = "Tomorrow"
        } else if (listId === "week") {
            listDetails = getListDetailsFromDates(taskObj, getDateFromToday(), getDateFromToday(6))
            listDetails.name = "This Week"
        } else if (listId === "completed") {
            listDetails = getListDetailsFromDates(taskObj, null, null, true)
            listDetails.name = "Completed"
        } else {

            let list = lists && Object.values(lists).find(lst => lst.id === +listId)

            if (list) {
                listDetails = getListDetailsFromList(taskObj, +listId)
                listDetails.name = list.name
            } else if (list === undefined) {
                return "/app/lists/all"
            }
        }

    } else if (filterId === 'tags') {

        let tag = tags && Object.values(tags).find(tag => tag.id === +listId)

        if (tag) {
            listDetails = getListDetailsFromTag(taskObj, +listId)
            listDetails.name = tag.name
        } else if (tag === undefined) {
            return "/app/lists/all"
        }

    } else if (filterId === 'search') {

        if (listId) {
            const searchList = decodeURIComponent(baseListId).split(' ')
            listDetails = getListDetailsFromSearch(taskObj, searchList)
            listDetails.name = `Search: ${searchList.join(' ')}`
        }
    } else {
        return "/app/lists/all"
    }

    return listDetails
}
