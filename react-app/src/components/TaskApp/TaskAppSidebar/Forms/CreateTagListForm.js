import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ColorDropdown from "./ColorDropdown"
import "./CreateTagListForm.css"

export default function CreateListTagForm(props) {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [color, setColor] = useState('#006400')
  const [validationErr, setValidationErr] = useState('')

  const userId = useSelector(state => state.session.user.id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 1) {
      setValidationErr("No name entered. Please choose a name.")
    } else if (name.length > 150) {
      setValidationErr("Name is too long. Please choose a shorter name.")
    } else {
      setValidationErr()

      const dataObj = {
        'user_id': userId,
        'name': name,
      }

      if(props.feature === "tag"){
        dataObj.color = color;
      }

      const response = await dispatch(props.thunk(dataObj));
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


  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: '300px' }}
    >
      <div
        id="form-content-container"
      >
        <label for="modal_text_input_name">Please enter a new {props.feature} name</label>
        <input
          id='modal_text_input_name'
          className={validationErr ? 'modal-text-err' : ''}
          type='text'
          onChange={e => setName(e.target.value)}
          autoFocus
        />

        {validationErr &&
          <div id="modal-err">
            {validationErr}
          </div>}

          {props.feature === "tag" && <ColorDropdown color={color} setColor={setColor}/>}

      </div>
      <div id='modal_buttons'>
        <button id='modal_submit' type='submit'>Add</button>
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
