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

    return arr.reduce((found, testStr) => {
        if (!lowercaseString.includes(testStr.toLowerCase())) found = false
        return found
    }, true);
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

export function getListDetails({filter, featureId}, tasks, lists, tags) {

    const baseListId = featureId;

    featureId = featureId ? featureId.toLowerCase() : featureId
    filter = filter ? filter.toLowerCase() : filter

    let listDetails = null;
    let taskObj = tasks ? tasks : {};

    switch (filter) {
        case 'all':
            listDetails = getListDetailsFromDates(taskObj)
            listDetails.name = "All Tasks"
            break
        case 'today':
            listDetails = getListDetailsFromDates(taskObj, getDateFromToday(), getDateFromToday())
            listDetails.name = "Today"
            break
        case 'tomorrow':
            listDetails = getListDetailsFromDates(taskObj, getDateFromToday(1), getDateFromToday(1))
            listDetails.name = "Tomorrow"
            break
        case 'week':
            listDetails = getListDetailsFromDates(taskObj, getDateFromToday(), getDateFromToday(6))
            break
        case 'lists':
            let list = lists && Object.values(lists).find(lst => lst.id === +featureId)

            if (list) {
                listDetails = getListDetailsFromList(taskObj, +featureId)
                listDetails.name = list.name
            } else if (list === undefined) {
                return "/app"
            }
            break
        case 'tags':
            if (featureId === undefined) {
                listDetails = getListDetailsFromDates(taskObj)
                listDetails.name = "All Tasks"
            } else {
                let tag = tags && Object.values(tags).find(tag => tag.id === +featureId)

                if (tag) {
                    listDetails = getListDetailsFromTag(taskObj, +featureId)
                    listDetails.name = tag.name
                } else if (tag === undefined) {
                    return "/app"
                }
            };
            break
        case 'search':
            if (featureId) {
                const searchList = decodeURIComponent(baseListId).split(' ')
                listDetails = getListDetailsFromSearch(taskObj, searchList)
                listDetails.name = `Search: ${searchList.join(' ')}`
            }
            break
        default:
            listDetails = getListDetailsFromDates(taskObj)
            listDetails.name = "All Tasks"
            break
    }

    return listDetails
};
