import React from 'react';
import './card.css';
const Card = (props: any) => {
    return (
        <>
            <div className="card mb-3 container" >
                <div className="row g-0 ">
                    {props.children}
                </div>
            </div>
        </>
    );
};

export default Card;