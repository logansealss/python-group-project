import { useDispatch } from "react-redux";

import * as listActions from '../../../../store/lists'
import * as tagActions from '../../../../store/tags'

export default function RemoveTagListForm (props) {
  const dispatch = useDispatch()

  const actions = {
    'list': listActions.deleteList,
    'tag': tagActions.deleteTag
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(actions[props.feature](props.id));
    if (response.ok) {
      props.setShowModal(false);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>{`Are you sure you wish to remove the ${props.feature} `} <span>{props.name}</span>?<span>No tasks will be affected by this action.</span></div>
      <div id='modal_buttons'>
        <button id='modal_submit' type='submit'>
          {`Yes, remove ${props.feature}`}
        </button>
        <button
          id='modal_cancel'
          onClick={()=> {props.setShowModal(false)}}
          >
          Cancel
        </button>
      </div>
    </form>
  );
};
