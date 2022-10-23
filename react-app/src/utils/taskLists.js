import { Redirect } from 'react-router-dom';

export function getDateFromToday(daysForward = 0) {
    let res = new Date();
    res.setDate(res.getDate() + daysForward)
    res = res.toISOString();
    res = res.slice(0, 10)
    return res;
}


function aggregateDetails (tasks) {

    let result = {
        overdueTasks: 0,
        estimatedTime: 0,
        tasks: [],
        completedTasks: []
    }

    return tasks.reduce((result, task) => {
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
        return result
    }, result)
}

function taskPassesChecks (task, filterFuncs) {
    return filterFuncs.reduce((passes, filterFunc)=>{
        passes = passes && filterFunc(task);
        return passes;
    },true);
}

function getTaskDetails (tasks, filterFuncs=[(task)=>true]) {
    let tasksToCheck = Object.values(tasks)
    const filteredTasks = tasksToCheck.filter(task=>{
        taskPassesChecks(task, filterFuncs)
    })
    return aggregateDetails(filteredTasks)
};


// Filter Functions
function stringIncludesArr(arr) {
    return (task) => {
        const lowercaseString = task.name.toLowerCase()
        return arr.reduce((found, testStr) => {
            if (!lowercaseString.includes(testStr.toLowerCase())) found = false
            return found
        }, true);
    }
}

export function checkListId (listId) {
    return (task) => {
        return task.listId === listId
    }
}

export function checkTagId (tagId) {
    return (task) => {
        return task.tags.includes(tagId)
    };
};

export function checkDueDate (startDate, dueDate) {
    return (task) => {
        let taskDueDate = task.dueDate ? task.dueDate.slice(0, 10) : task.dueDate
        return taskDueDate >= startDate && taskDueDate <= dueDate
    };
};

export function showCompleted (showCompleted) {
    return (task) => {
        return task.completed === showCompleted
    }
}

export function getTaskDetailsFromParams(params, tasks, lists, tags) {
    const {filter, featureId} = params


    featureId = featureId ? featureId.toLowerCase() : featureId
    filter = filter ? filter.toLowerCase() : filter

    let listDetails = null;
    let taskObj = tasks ? tasks : {};

    switch (filter) {
        case 'all':
            listDetails = getTaskDetails(taskObj, [showCompleted(false)])
            listDetails.name = "All Tasks"
            break
        case 'today':
            listDetails = getTaskDetails(taskObj, [
                checkDueDate(getDateFromToday(), getDateFromToday())
            ]);
            listDetails.name = "Today"
            break
        case 'tomorrow':
            listDetails = getTaskDetails(taskObj, [
                checkDueDate(getDateFromToday(1), getDateFromToday(1)),
                showCompleted(false)
            ]);
            listDetails.name = "Tomorrow"
            break
        case 'week':
            listDetails = getTaskDetails(taskObj, [
                checkDueDate(getDateFromToday(), getDateFromToday(6)),
                showCompleted(false)
            ]);
            break
        case 'completed':
            listDetails = getTaskDetails(taskObj, [showCompleted(true)])
            break
        case 'lists':
            if (featureId === undefined) {
                listDetails = getTaskDetails(taskObj)
                listDetails.name = "All Tasks"
            } else {
                let list = lists && Object.values(lists).find(lst => lst.id === +featureId)
                if (list) {
                    listDetails = getTaskDetails(taskObj, [checkListId(+featureId), showCompleted(false)])
                    listDetails.name = list.name
                } else if (list === undefined) {
                    return "/app"
                }
            }
            break
        case 'tags':
            if (featureId === undefined) {
                listDetails = getTaskDetails(taskObj)
                listDetails.name = "All Tasks"
            } else {
                let tag = tags && Object.values(tags).find(tag => tag.id === +featureId)

                if (tag) {
                    listDetails = getTaskDetails(taskObj, [checkTagId(+featureId), showCompleted(false)])
                    listDetails.name = tag.name
                } else if (tag === undefined) {
                    return "/app"
                }
            };
            break
        case 'search':
            if (featureId) {
                const searchParams = featureId;
                const searchList = decodeURIComponent(searchParams).split(' ')
                listDetails.name = `Search: ${searchList.join(' ')}`
                listDetails = getTaskDetails(taskObj, [stringIncludesArr(searchList)])
            }
            break
        default:
            listDetails = getTaskDetails(taskObj)
            listDetails.name = "All Tasks"
            break
    }

    return listDetails
};
