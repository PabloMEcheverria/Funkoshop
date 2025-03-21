import * as React from "react";

export default function AdminPageAdd(props) {
    return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={40}
          height={40}
          fill="none"
          {...props}
        >
          <path
            fill={props.fill || "#F33"}
            d="M30.833 22.452h-8.666v8.666h-4.334v-8.666H9.167v-4.334h8.666V9.452h4.334v8.666h8.666M35.167.785H4.833A4.318 4.318 0 0 0 .5 5.118v30.334a4.333 4.333 0 0 0 4.333 4.333h30.334a4.333 4.333 0 0 0 4.333-4.333V5.118A4.333 4.333 0 0 0 35.167.785Z"
          />
        </svg>
    )
}