import * as React from "react";

export default function ItemShopPlus(props) {
  return (
    <>
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={16}
      fill="none"
      {...props}
      >
        <path fill={props.fill === undefined ? "#F24E1E" : props.fill} d="M.653.647h18v16h-18z" />
        <path fill="#fff" d="M8.974 12.647v-8h1.357v8H8.974ZM5.653 9.326V7.968h8v1.358h-8Z"/>
      </svg>
    </>
  )
}