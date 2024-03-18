import * as React from "react"
const ShopArrowDown = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={10}
    fill="none"
    {...props}
  >
    <path
      fill={props.fill || "#fff"}
      fillRule="evenodd"
      d="M.867 2.438 2.76.695l4.232 4.6L10.405.79l2.052 1.554-5.272 6.96L.867 2.439Z"
      clipRule="evenodd"
    />
  </svg>
)
export default ShopArrowDown
