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
    <path fill="#fff" d="M8.974 12.647v-8h1.357v8H8.974ZM5.653 9.326V7.968h8v1.358h-8Z"/>
  </svg>
}