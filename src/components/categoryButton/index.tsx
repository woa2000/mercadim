import React from "react";
import "./styles.css";

import { AiOutlineAppstore } from 'react-icons/ai';

interface Props {
    categoryName: string;
    active : boolean;
    onClick: (categoryName : string) => void;
}

function CategoryButton({categoryName, active, onClick} : Props) {
    return (
        <>
            <button className={active == true ? "btn-category active": "btn-category"} onClick={() => {onClick(categoryName);}} >
                <AiOutlineAppstore className="img-category" />
                <div className="text">
                    <p className="text-btn-category">{categoryName}</p>
                </div>
            </button>
        </>
    )
}

export default CategoryButton;

