import { useState } from "react";
import { useDispatch } from "react-redux";
import ColorDropdown from "./ColorDropdown"

import * as listActions from '../../../../store/lists'
import * as tagActions from '../../../../store/tags'


export default function RenameListTagForm(props) {
  const dispatch = useDispatch()
  const [name, setName] = useState(props.name)
  const [visited, setVisited] = useState(false)
  const [color, setColor] = useState(props.color ? props.color : "#006400")
  const [validationErr, setValidationErr] = useState()

  const actions = {
    'list': listActions.renameList,
    'tag': tagActions.renameTag
  }



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 1) {
      setValidationErr("No name entered. Please choose a name.")
    } else if (name.length > 150) {
      setValidationErr("Name is too long. Please choose a shorter name.")
    } else {
      setValidationErr()

      const dataObj = {
        'id': props.itemId,
        'name': name,
      }

      if(props.feature === "tag"){
        dataObj.color = color;
      }

      const response = await dispatch(actions[props.feature](dataObj));
      if (response.ok) {
        props.setShowModal(false);
      } else {
        let data = await response.json()
        if (data.errors) {
          setValidationErr(`You already have a ${props.feature} with this name. Please choose another name.`)
        }
      }
    }
  };

  const handleFocus = (event) => {
    if (!visited) {
      event.target.select();
      setVisited(true)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: '300px' }}
    >
      <div
        id="form-content-container"
      >
        <label>{props.feature[0].toUpperCase() + props.feature.substring(1)} name</label>
        <br></br>
        <input
          id='modal_text_input'
          className={validationErr ? 'modal-text-err' : ''}
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
          autoFocus
          onFocus={handleFocus}
        />

        {validationErr &&
          <div id="modal-err">
            {validationErr}
          </div>}

        {props.feature === "tag" && <ColorDropdown color={color} setColor={setColor} />}
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
