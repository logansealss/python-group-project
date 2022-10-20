import downCaret from '../../../img/caret-down.svg';
import ModalWrapper from '../../../context/Modal.js';
import DropDownWrapper, { DropdownProvider } from '../../../context/Dropdown';
import RemoveTagListForm from './Forms/RemoveTagListForm';
import RenameTagListForm from './Forms/RenameTagListForm';
export default function BannerItem (props) {

  return (
    <DropdownProvider position='relative'>
      <div id='banner_item'>
        <div className='title' onClick={props.handleClick}>{props.children}</div>
          <div className='collapser_rhs_icons'>
            <DropDownWrapper
              offset='0px'
              left={true}
              menu={
                <Menu
                  itemId={props.itemId}
                  feature={props.feature}
                  name={props.name}
                />}
              >
              <img id='dropdown_caret' className='tasb-caret' src={downCaret} />
            </DropDownWrapper>
            {props.obj}

        </div>
      </div>
    </DropdownProvider>
  )
}

function Menu (props) {
  return (
    <div id='banner_dropdown'>
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
        <div id='sidebar_dropdown_button'>Delete</div>
      </ModalWrapper>
    </div>
  );
};
