import * as React from "react"
export default function PaginationNext(props) {
    return (
        <svg
          xmlns="http://www.w3.org/2000/svg" 
          className="pagination__svg" 
          width={11}
          height={18}
          fill="#C4CDD5"
          {...props}
        >
          <path
            fill={props.fill}
            d="M.608 2.689 6.906 9 .608 15.311l1.939 1.939L10.797 9 2.547.75.608 2.689Z"
          />
        </svg>
      )
      
}