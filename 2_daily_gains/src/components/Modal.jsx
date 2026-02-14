import ReactDom from 'react-dom'

export default function Modal(props) {
    
    const { showExerciseDescription, handleCloseModal } = props
    const {name, description} = showExerciseDescription || {}


    return ReactDom.createPortal((
        <div className="modal-container">
            {/* this button is an underlay only 
            so that user can click the background
            anywhere on modal
            to close the portal */}
            <button 
                className="modal-underlay"
                onClick={handleCloseModal}
            />
            <div className="modal-content">
                <h6>Name</h6>
                <h2 className="skill-name">{name.replaceAll('-', ' ')}</h2>
                <h6>Description</h6>
                <p>{description}</p>
            </div>
        </div>
    ),
        document.getElementById('portal')
    )
}