import * as React from "react";

export default function CancelIcon(props) {
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={29}
    fill="none"
    {...props}
  >
    <path
      fill={props.fill !== undefined ? props.fill : "#F24E1E"}
      d="M19.064 11.523a1.17 1.17 0 0 0 .057-1.65 1.167 1.167 0 0 0-1.649-.057l-3.414 3.182-3.182-3.414a1.167 1.167 0 0 0-1.706 1.59l3.183 3.415-3.415 3.182a1.167 1.167 0 1 0 1.591 1.706l3.414-3.182 3.183 3.414a1.169 1.169 0 0 0 1.675.088 1.166 1.166 0 0 0 .03-1.678l-3.181-3.414 3.414-3.182Z"
    />
    <path
      fill={props.fill !== undefined ? props.fill : "#F24E1E"}
      fillRule="evenodd"
      d="M1.167 14.647C1.167 7.559 6.913 1.814 14 1.814c7.088 0 12.833 5.745 12.833 12.833 0 7.087-5.745 12.833-12.833 12.833-7.087 0-12.833-5.746-12.833-12.833ZM14 25.147A10.501 10.501 0 0 1 6.575 7.222 10.5 10.5 0 1 1 14 25.147Z"
      clipRule="evenodd"
    />
  </svg>
}
