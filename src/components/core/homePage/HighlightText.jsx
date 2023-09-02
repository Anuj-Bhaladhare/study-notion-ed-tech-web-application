import React from "react";

const HighlightText = ({text}) => {
    return(
        <span className="font-bold text-[#12d1fc]">
            {" "}
            {text}
        </span>
    )
}

export default HighlightText;