
// constants
const LOAD_ALL = 'tags/LOAD_ALL';
const CREATE = 'tags/CREATE';
const UPDATE = 'tags/UPDATE';
const DELETE = 'tags/DELETE';

const loadAll = allTags => ({
    type: LOAD_ALL,
    allTags
});

const loadOne = newTag => ({
    type: CREATE,
    newTag
});

const updateTag = updatedTag => ({
    type: UPDATE,
    updatedTag
})

const removeTag = id => ({
    type: DELETE,
    id
});

export const getAllTags = () => async (dispatch) => {
    const response = await fetch('/api/tags', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        const allTags = await response.json();
        dispatch(loadAll(allTags));
        return response;
    }
    return response;
}


export const createTag = newTag => async dispatch => {
    const response = await fetch('/api/tags', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTag)
    })
    if (response.ok) {
        newTag = await response.json();
        dispatch(loadOne(newTag))
        return response;
    };
    return response;
};

export const renameTag = (updatedTag) => async dispatch => {
    const response = await fetch(`/api/tags/${updatedTag.id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'name': updatedTag.name, 'color': updatedTag.color}),
    });

    if (response.ok) {
        updatedTag = await response.json();
        dispatch(updateTag(updatedTag));
        return response;
    }
    return response;
}


export const deleteTag = (id) => async dispatch => {
    const response = await fetch(`/api/tags/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(removeTag(id))
        return response
    };
    return response;
};



const initialState = null;
let newState;
export const tagReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL:
            return { ...action.allTags }
        case CREATE:
            return {...state, [action.newTag.id]: action.newTag }
        case UPDATE:
            return {...state, [action.updatedTag.id] : action.updatedTag}
        case DELETE:
            newState = {...state}
            delete newState[action.id]
            return {...newState}
        default:
            return state;
    }
}
