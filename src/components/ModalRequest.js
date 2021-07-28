import React from 'react';

import { Modal, ModalBody, ModalHeader} from 'reactstrap';


const changeModal = (isOpen, msg, showButton) => {
  
    this.setState({ ModalRequest: {isOpen: isOpen, message: msg, showButton: showButton} });
  
  }


const ModalRequest = ({isOpen, message, showButton, closeModal,}) => {

    return (
        
        <Modal isOpen={isOpen}>
        <ModalBody>
          {message}
          {showButton?
          <div>  
            <button className="btn btn-primary" onClick={()=>closeModal()}>Aceptar</button>
          </div>
          : ''}
        </ModalBody>
      </Modal>

    )

}

export default ModalRequest