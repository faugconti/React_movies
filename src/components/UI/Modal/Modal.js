import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

const ModalOverlay = props => {
    const content = (
        <div className={[props.className,classes.Modal].join(' ')}
             style={props.style} >
            <header className={[props.headerClass,classes.Modal__Header].join(' ')}>
                <h2>{props.header}</h2>
            </header>
            <form
                onSubmit={
                    props.onSubmit ? props.onSubmit : event => event.preventDefault()
                }>
                <div className={[classes.Modal__Content,props.contentClass].join(' ')}>
                    {props.children}
                </div>
                <footer className={[classes.Modal__Footer,props.footerClass].join(' ')}>
                    {props.footer}
                </footer>
            </form>
        </div>
    );
    return ReactDOM.createPortal(content,document.getElementById('modal-hook'));
};


const modal = props => {

    return (
        <React.Fragment>
            <Backdrop 
                show={props.show} 
                clicked={props.onCancel} />
            <CSSTransition
                in={props.show}
                mountOnEnter
                unmountOnExit
                timeout={100}
                classNames={{
                        enterDone: classes['modal-enter-active'],
                        enterActive: classes['modal-enter'],
                        exitActive: classes['modal-exit-active'],
                        exitDone: classes['modal-exit']
                    }
                }
            >
                <ModalOverlay {...props} />
            </CSSTransition>

        </React.Fragment>
    );
};

export default modal;