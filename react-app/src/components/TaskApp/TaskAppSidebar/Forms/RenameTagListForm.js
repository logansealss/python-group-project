import { useState } from "react";
import { useDispatch} from "react-redux";

import * as listActions from '../../../../store/lists'
import * as tagActions from '../../../../store/tags'


export default function RenameListTagForm (props) {
  const dispatch = useDispatch()
  const [name, setName] = useState(props.name)

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


  return (
    <form onSubmit={handleSubmit}>
      <div>{props.feature[0].toUpperCase() + props.feature.substring(1)} name</div>
      <input
        id='modal_text_input'
        type='text'
        onChange={e=>setName(e.target.value)}

        />
      <div id='modal_buttons'>
        <button id='modal_submit' type='submit'>Save</button>
        <button
          id='modal_cancel'
          onClick={()=> {
            props.setShowModal(false)
          }}
          >
          Cancel
        </button>
      </div>
    </form>
  );
};
