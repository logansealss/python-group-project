import ModalWrapper from '../../../context/Modal'
import downCaret from '../../../img/caret-down.svg'


export default function BannerItem (props) {
  return (
    <div id='banner_item'>
    <div className='grow'>{props.children}</div>
      <div className='collapser_rhs_icons'>
        {props.obj}
        <ModalWrapper form={<div>My new Modal</div>}>
          <img className='tasb-caret' src={downCaret} />
        </ModalWrapper>
    </div>
    </div>
  )
}
