export function getDateFromToday(daysForward = 0) {
    let res = new Date();
    res.setHours(res.getHours() - 6)
    res.setDate(res.getDate() + daysForward)
    res = res.toISOString();
    res = res.slice(0, 10)
    return res;
}

// Aggregator functions
export function aggregateDetails (tasks, showCompleted) {

    let result = {
        overdueTasks: 0,
        estimatedTime: 0,
        tasks: [],
        completedTasks: []
    }

    const currentDate = getDateFromToday()

    const aggregateDetails = tasks.reduce((result, task) => {
        let taskDueDate = task.dueDate ? task.dueDate.slice(0, 10) : task.dueDate
        if (!task.completed && !showCompleted) {
            result.tasks.push(task)
            if (taskDueDate < currentDate) {
                result.overdueTasks++;
            }
            if (task.duration > 0) {
                result.estimatedTime += task.duration
            }
        }
        if (task.completed) {
            result.completedTasks.push(task)
            if (showCompleted) result.tasks.push(task)
            if (task.duration > 0) {
                result.estimatedTime += task.duration
            }
        };
        return result
    }, result)
    return aggregateDetails;
}

export function taskPassesChecks (task, filterFuncs) {
    return filterFuncs.reduce((passes, filterFunc)=>{
        passes = passes && filterFunc(task);
        return passes;
    },true);
}

export function getTaskDetails (tasks, showCompleted=false, filterFuncs=[(task)=>true], ) {
    let tasksToCheck = Object.values(tasks)
    const filteredTasks = tasksToCheck.filter(task=>{
        return taskPassesChecks(task, filterFuncs)
    })
    return aggregateDetails(filteredTasks, showCompleted)
};


// Filter Functions
export function stringIncludesArr(arr) {
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




// Switch router for different Routes
export function getTaskDetailsFromParams(params, tasks, lists, tags) {
    let {filter, featureId} = params


    featureId = featureId ? featureId.toLowerCase() : featureId
    filter = filter ? filter.toLowerCase() : filter

    let listDetails = null;
    let taskObj = tasks ? tasks : {};

    switch (filter) {
        case 'tasks':
            switch (featureId) {
                case 'all':
                    listDetails = getTaskDetails(taskObj)
                    listDetails.name = "All Tasks"
                    break
                case 'today':
                    listDetails = getTaskDetails(taskObj,showCompleted=false, [
                        checkDueDate(getDateFromToday(), getDateFromToday())
                    ]);
                    listDetails.name = "Today"
                    break
                case 'tomorrow':
                    listDetails = getTaskDetails(taskObj,showCompleted=false, [
                        checkDueDate(getDateFromToday(1), getDateFromToday(1)),

                    ]);
                    listDetails.name = "Tomorrow"
                    break
                case 'week':
                    listDetails = getTaskDetails(taskObj,showCompleted=false,
                        [checkDueDate(getDateFromToday(), getDateFromToday(6))]
                        );
                        listDetails.name = "This Week"
                    break
                case 'completed':
                    listDetails = getTaskDetails(taskObj, showCompleted=true)
                    listDetails.name = "Completed"
                    break
                default:
                    return "/rip"
            }
            break
        case 'lists':
            if (featureId === undefined) {
                listDetails = getTaskDetails(taskObj)
                listDetails.name = "All Tasks"
            } else {
                let list = lists && Object.values(lists).find(lst => lst.id === +featureId)
                if (list) {
                    listDetails = getTaskDetails(taskObj, showCompleted=false, [checkListId(+featureId)])
                    listDetails.name = list.name
                } else if (list === undefined) {
                    return "/rip"
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
                    listDetails = getTaskDetails(taskObj, showCompleted=false, [checkTagId(+featureId)])
                    listDetails.name = tag.name
                } else if (tag === undefined) {
                    return "/rip"
                }
            };
            break
        case 'search':
            if (featureId) {
                const searchParams = featureId;
                const searchList = decodeURIComponent(searchParams).split(' ')
                listDetails = getTaskDetails(taskObj,showCompleted=false, [stringIncludesArr(searchList)])
                listDetails.name = `Search: ${searchList.join(' ')}`
            }
            break
    }

    return listDetails
};
