import downCaret from '../../../img/caret-down.svg';
import ModalWrapper from '../../../context/Modal.js';
import DropDownWrapper, { DropdownProvider } from '../../../context/Dropdown';
import RemoveTagListForm from '../../Forms/RemoveTagListForm';
import * as listActions from '../../../store/lists';
import * as tagActions from '../../../store/tags';



export default function BannerItem (props) {

  return (
    <DropdownProvider>
      <div id='banner_item'>
        <div className='title'>{props.children}</div>
          <div className='collapser_rhs_icons'>
            <DropDownWrapper
              offset='14px'
              left={true}
              menu={
                <Menu
                  id={props.id}
                  feature={props.feature}
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
    <div id='banner_dropdown' onClick={e=>e.stopPropagation()}>
      <ModalWrapper header={props.header} form={<RemoveTagListForm/>} feature={props.feature} >
        <div>Rename</div>
      </ModalWrapper>
      <ModalWrapper
        header={props.header}
        form={<RemoveTagListForm/>}
        feature={props.feature}
        id={props.id}
        >
        <div>Delete</div>
      </ModalWrapper>
    </div>
  );
};
