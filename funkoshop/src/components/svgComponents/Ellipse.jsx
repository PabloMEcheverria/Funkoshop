import * as React from "react"
const Ellipse = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <circle cx={9} cy={9} r={9} fill={props.fill || "#F33"} />
  </svg>
)
export default Ellipse
