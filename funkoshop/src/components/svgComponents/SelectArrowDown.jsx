import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={10}
    fill="none"
    {...props}
  >
    <path
      fill={props.fill}
      d="M6.569 8.815 1.255 3.5C.608 2.854.464 2.113.822 1.28 1.18.446 1.819.028 2.737.027h10.525c.92 0 1.559.417 1.917 1.253.358.835.213 1.575-.435 2.221L9.43 8.815a2.122 2.122 0 0 1-.664.46A1.925 1.925 0 0 1 8 9.428c-.273 0-.528-.051-.767-.153a2.122 2.122 0 0 1-.664-.46Z"
    />
  </svg>
)
export default SvgComponent