import React, { useEffect, useRef, useState, useContext } from "react";
import ReactDom from 'react-dom';
import x_svg from '../img/x.svg'

import './Modal.css'

const ModalContext = React.createContext();

export function ModalProvider({children}) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(()=> {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef}></div>
    </>
  )
}

export default function ModalWrapper(props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    {React.cloneElement(
      props.children,
      {
        onClick: ()=> setShowModal(true),
        style: {'cursor': 'pointer'}
      },
      // props.buttonContent need to add content for wrapped child
      )}
    {showModal && (
      <Modal
        onClose={()=> setShowModal(false)}
        setShowModal={setShowModal}
        showModal={showModal}
        header={props.header || ''}
        >
        {props.form}
      </Modal>
    )}
    </>
  );
};


export function Modal (props) {
  const modalNode = useContext(ModalContext)
  if (!modalNode) return null;

  return ReactDom.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={props.onClose} />
        <div id="modal-container">
          <div id='modal-header'>
            {props.header}
            <img
            id='modal-close-button'
              src={x_svg}
              onClick={()=> {
                props.setShowModal(false)
              }}
              />
          </div>
          <div id='modal-content'>
            {React.cloneElement(props.children, props.setShowModal)}
          </div>
        </div>
    </div>,
    modalNode
  );
};
