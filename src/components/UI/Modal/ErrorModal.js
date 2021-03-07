import React from 'react';
import Modal from './Modal';
import Button from '../Button/Button';

const ErrorModal = props => {

    return (
        <Modal
            onCancel={props.onClear}
            header="An error occurred!"
            show={!!props.error}
            footer={<button onClick={props.onClear}>Ok</button>}
        >
            <p>{props.error}</p>
        </Modal>
    )

};

export default ErrorModal;