import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import * as listActions from '../../../../store/lists'
import * as tagActions from '../../../../store/tags'

export default function RemoveTagListForm(props) {
  const dispatch = useDispatch()
  const mountedRef = useRef(true)

  const actions = {
    'list': listActions.deleteList,
    'tag': tagActions.deleteTag
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(actions[props.feature](props.itemId));
    if (response.ok && mountedRef.current) {
      props.setShowModal(false);
    }
  };

  useEffect(() => {
    mountedRef.current = false
  }, [])


  return (
    <form 
      onSubmit={handleSubmit}
      style={{width: '400px'}}
    >
      <div
        id="form-content-container"
      >
        <div>{`Are you sure you wish to remove the ${props.feature} `} <strong>{props.name}</strong>?<span> No tasks will be affected by this action.</span></div>
      </div>
      <div id='modal_buttons'>
        <button id='modal_submit' type='submit'>
          {`Yes, remove ${props.feature}`}
        </button>
        <button
          id='modal_cancel'
          onClick={() => { props.setShowModal(false) }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
