import * as React from "react"
export default function PaginationPrevious(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={12} height={18} fill="none" {...props}>
          <path
            fill={props.fill !== undefined ? props.fill : "#C4CDD5"}
            d="M11.048 2.689 4.751 9l6.297 6.311L9.11 17.25.86 9 9.11.75l1.94 1.939Z"
          />
        </svg>
      )
} 
