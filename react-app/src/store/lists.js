import CreateListTagForm from "../components/Forms/CreateTagListForm";

// constants
const LOAD_ALL = 'lists/LOAD_ALL';
const CREATE = 'lists/CREATE';

const loadAll = allLists => ({
    type: LOAD_ALL,
    allLists
});

const loadNew = newList => ({
    type: CREATE,
    newList
});

export const getAllLists = () => async (dispatch) => {
    const response = await fetch('/api/lists', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        const allLists = await response.json();
        dispatch(loadAll(allLists));
        return response;
    }
    return response;
}

export const createList = (newList) => async dispatch => {
    const response = await fetch('/api/lists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newList),
    });

    if (response.ok) {
        const newList = await response.json();
        dispatch(loadNew(newList));
        return response;
    };
    return response;
}

const initialState = null;

export const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL:
            return { ...action.allLists }
        case CREATE:
            return {...state, [action.newList.id]: action.newList }
        default:
            return state;
    }
}
