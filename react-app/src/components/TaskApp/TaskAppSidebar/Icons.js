import React from 'react'

import ModalWrapper from '../../../context/Modal';
import DropDownWrapper from '../../../context/Dropdown';
import Menu from './Menu';

import plus_img from '../../../img/plus.svg';
import downCaret from '../../../img/caret-down.svg';

export function Plus (props) {
  return (
    <ModalWrapper
      form={props.form}
      header={`Add a ${props.feature}`}
      feature={props.feature}
      thunk={props.thunk}
      >
      <img className='plus' src={plus_img}/>
    </ModalWrapper>
  )
};

export function Count(props) {
  return (<div className='count'>{props.count}</div>)
};

export const DownCaret = React.forwardRef((props, ref) => {
  return (
    <DropDownWrapper
      offset='0px'
      left={true}
      menu={
        <Menu
          itemId={props.itemId}
          feature={props.feature}
          name={props.name}
          color={props.color}
        />}
      closeOnClick={true}
      >
      <img 
        ref={ref}
        className='dropdown_caret' src={downCaret} 
      />
    </DropDownWrapper>
  )
})

// export function DownCaret (props) {
//   return (
//     <DropDownWrapper
//       offset='0px'
//       left={true}
//       menu={
//         <Menu
//           itemId={props.itemId}
//           feature={props.feature}
//           name={props.name}
//           color={props.color}
//         />}
//       closeOnClick={true}
//       >
//       <img className='dropdown_caret' src={downCaret} />
//     </DropDownWrapper>
//   )
// }
