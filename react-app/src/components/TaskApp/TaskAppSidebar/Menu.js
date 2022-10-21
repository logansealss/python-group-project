import RemoveTagListForm from './Forms/RemoveTagListForm';
import RenameTagListForm from './Forms/RenameTagListForm';
import ModalWrapper from '../../../context/Modal.js';

export default function Menu (props) {
  return (
    <div className='banner_dropdown'>
      <ModalWrapper
        header={`Rename ${props.feature}`}
        name={props.name}
        form={<RenameTagListForm/>}
        feature={props.feature}
        itemId={props.itemId}
        >
        <div id='sidebar_dropdown_button'>Rename</div>
      </ModalWrapper>
      <ModalWrapper
        header={`Delete ${props.feature}`}
        name={props.name}
        form={<RemoveTagListForm/>}
        feature={props.feature}
        itemId={props.itemId}
        >
        <div className='sidebar_dropdown_button'>Delete</div>
      </ModalWrapper>
    </div>
  );
};
