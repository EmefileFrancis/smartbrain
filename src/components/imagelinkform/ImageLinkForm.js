import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChanged, onButtonClicked }) => {
    return(
        <div className='ma4 mt0'>
            <p className='f3'>
                {'This SmartBrain will detect faces in Pictures. Give it a try.'}
            </p>
            <div className='form center pa4 br3 shadow-5'>
                <input 
                    type='text' 
                    className='f4 pa2 w-70 center'
                    onChange={onInputChanged}/>
                <button 
                    className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                    onClick={onButtonClicked}>Detect</button>
            </div>
            
        </div>
    );
}

export default ImageLinkForm;