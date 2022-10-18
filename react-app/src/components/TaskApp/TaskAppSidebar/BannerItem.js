import downCaret from '../../../img/caret-down.svg';
import ModalWrapper from '../../../context/Modal.js';
import DropDownWrapper from '../../DropdownWrapper';
import RemoveTagListForm from '../../Forms/RemoveTagListForm';

function Menu (props) {
  return (
    <div id='banner_dropdown'>
      <ModalWrapper>
        <div>Rename</div>
      </ModalWrapper>
      <ModalWrapper form={<RemoveTagListForm id={props.id}/>}>
        <div>Delete</div>
      </ModalWrapper>
    </div>
  );
};

export default function BannerItem (props) {

  return (
    <>
    <div id='banner_item'>
      <div className='title'>{props.children}</div>
        <div className='collapser_rhs_icons'>
          <DropDownWrapper
            offset='14px'
            left={true}
            menu={<Menu id={props.id}/>}
            >
            <img id='dropdown_caret' className='tasb-caret' src={downCaret} />
          </DropDownWrapper>
          {props.obj}

      </div>
    </div>
    </>
  )
}
