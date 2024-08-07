import * as React from "react"
export default function SvgComponent(props) {
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={16}
    fill="none"
    {...props}
  >
    <path fill={props.fill === undefined ? props.fill : "#F24E1E"} d="M.653.647h18v16h-18z" />
    <path fill="#fff" d="M12.653 8.147v1h-6v-1h6Z" />
  </svg>
}