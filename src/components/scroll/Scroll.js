import React from 'react';

const Scroll = (props)=>{
    return(
        <div style={{overflowY : 'scroll', height : '130px',padding:'1px'}}>
            {props.children}
        </div>
    );
}

export default Scroll;
