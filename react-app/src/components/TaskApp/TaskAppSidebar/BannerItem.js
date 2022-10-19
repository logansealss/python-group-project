import downCaret from '../../../img/caret-down.svg';
import ModalWrapper from '../../../context/Modal.js';
import DropDownWrapper, { DropdownProvider } from '../../../context/Dropdown';
import RemoveTagListForm from './Forms/RemoveTagListForm';
import RenameTagListForm from './Forms/RenameTagListForm';
export default function BannerItem (props) {

  return (
    <DropdownProvider>
      <div id='banner_item'>
        <div className='title' onClick={props.handleClick}>{props.children}</div>
          <div className='collapser_rhs_icons'>
            <DropDownWrapper
              offset='14px'
              left={true}
              menu={
                <Menu
                  id={props.id}
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
  console.log(props.name)
  return (
    <div id='banner_dropdown' onClick={e=>e.stopPropagation()}>
      <ModalWrapper
        header={`Rename ${props.feature}`}
        name={props.name}
        form={<RenameTagListForm/>}
        feature={props.feature}
        >
        <div id='sidebar_dropdown_button' >Rename</div>
      </ModalWrapper>
      <ModalWrapper
        header={`Delete ${props.feature}`}
        name={props.name}
        form={<RemoveTagListForm/>}
        feature={props.feature}
        id={props.id}
        >
        <div id='sidebar_dropdown_button'>Delete</div>
      </ModalWrapper>
    </div>
  );
};
