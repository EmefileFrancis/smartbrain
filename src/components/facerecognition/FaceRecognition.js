import React from 'react';
import './FaceRecognition.css'



const FaceRecognition = ({ input, facesBoundingBoxes }) => {
    const boxesOnFaces = facesBoundingBoxes.map((face, i) => 
            <div key={i} className='bounding-box' style={{top: face.top, bottom: face.bottom, left: face.left, right: face.right}}></div> 
        )
    

    return(
        <div className='center'>
            <div className='absolute'>
                <img id='image' src={input} alt='photos with faces' width='500px' height='auto'/>
                {boxesOnFaces}
            </div>
            
        </div>
    );
}

export default FaceRecognition;