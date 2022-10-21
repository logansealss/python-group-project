import { useState } from "react";
import { useDispatch } from "react-redux";

import * as listActions from '../../../../store/lists'
import * as tagActions from '../../../../store/tags'


export default function RenameListTagForm(props) {
  const dispatch = useDispatch()
  const [name, setName] = useState(props.name)
  const [visited, setVisited] = useState(false)

  const actions = {
    'list': listActions.renameList,
    'tag': tagActions.renameTag
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(actions[props.feature]({
      'id': props.itemId,
      'name': name
    }));
    if (response.ok) {
      props.setShowModal(false);
    }

  };

  const handleFocus = (event) => {
    if(!visited){
      event.target.select();
      setVisited(true)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        id="form-content-container"
      >
        <label>{props.feature[0].toUpperCase() + props.feature.substring(1)} name</label>
        <br></br>
        <input
          id='modal_text_input'
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
          autoFocus
          onFocus={handleFocus}
        />
      </div>
      <div id='modal_buttons'>
        <button id='modal_submit' type='submit'>Save</button>
        <button
          id='modal_cancel'
          onClick={() => {
            props.setShowModal(false)
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
