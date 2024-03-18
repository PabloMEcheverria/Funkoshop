import * as React from "react"
const CartIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={31}
    fill="none"
    {...props}
  >
    <g fill={props.fill || "#fff"} clipPath="url(#a)">
      <path d="M12.5 31a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM25.5 31a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM32.45 4.558a1.044 1.044 0 0 0-.825-.408H7.499l-.47-1.493a1.044 1.044 0 0 0-.69-.68L2.059.663a1.049 1.049 0 1 0-.617 2.005l3.75 1.15 4.783 15.112-1.702 1.4-.136.135a2.778 2.778 0 0 0-.083 3.53 2.872 2.872 0 0 0 2.36 1.044h17.431a1.044 1.044 0 1 0 0-2.088H10.246a.7.7 0 0 1-.585-1.045l2.517-2.089h16.115a1.045 1.045 0 0 0 1.044-.793L32.68 5.445a1.044 1.044 0 0 0-.23-.887Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill={props.fill || "#fff"} d="M0 0h33v31H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default CartIcon
