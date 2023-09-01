import React from "react"; // Corrected import statement
import { FaArrowRight } from "react-icons/fa";
import CTAButton from "./Button";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  codecolor,
  backgroudGradient,
}) => {
  return (
    <div className={`flex flex-row ${position}`}>
      <div>
        <div>{heading}</div>

        <p>{subheading}</p>
        
        <div>
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div>
              {ctabtn1.btntext}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btntext}
          </CTAButton>
        </div>
      </div>

      <div className="flex flex-row">
        <div>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div className={`${codecolor}`}>
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
