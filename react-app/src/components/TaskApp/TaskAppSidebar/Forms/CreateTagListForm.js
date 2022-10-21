import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CreateTagListForm.css"

export default function CreateListTagForm(props) {
  const dispatch = useDispatch()
  const [name, setName] = useState('')

  const userId = useSelector(state => state.session.user.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(props.thunk({
      'user_id': userId,
      'name': name
    }));
    if (response.ok) {
      props.setShowModal(false);
    }

  };


  return (
    <form onSubmit={handleSubmit}>
      <div 
        id="form-content-container"
      >
        <label>Please enter a new {props.feature} name</label>
        <input
          id='modal_text_input'
          type='text'
          onChange={e => setName(e.target.value)}
          autoFocus
        />
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
