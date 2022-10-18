
// constants
const LOAD_ALL = 'tags/LOAD_ALL';
const CREATE = 'tags/CREATE'

const loadAll = allTags => ({
    type: LOAD_ALL,
    allTags
});

const loadOne = newTag => ({
    type: CREATE,
    newTag
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

const initialState = null;

export const tagReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL:
            return { ...action.allTags }
        case CREATE:
            return {...state, [action.newTag.id]: action.newTag }
        default:
            return state;
    }
}
