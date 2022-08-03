const Modal = ({show, setShow}) => {
    return ( 
        <div onClick={() => {setShow(false)} } className={`modal ${ show ? 'active' : '' }`}>
            <div className="modal-card card">
                <div className="modal-header">
                <h4 className="modal-title card-title">Alert</h4>
                </div>
                <div className="modal-body card-body">
                    <p className="card-text">Something went wrong. Please try again later</p>
                    <p className='text-muted'>Click anywhere to continue</p>
                </div>
            </div>
        </div>
     );
}

export default Modal;