import React from 'react';
import './card.css';
const Card = (props: any) => {
    return (
        <>
            <div className="card mb-3 container" >
                <div className="row g-0 ">
                    <div className="col-md-4 profile  profilePhotoContainer" >
                        <img src={props.imagePreview} className="img-fluid rounded-start profilePhoto"  alt=""/>
                    </div>
                    <div className="col-md-8" >
                        <div className="card-body">
                            <h5 className="card-title">Result Analyse</h5>
                            <div className="card cardlist" >
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;