import * as React from "react"

export default function ItemShopPlus(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={8}
            height={9}
            fill={props.fill}
            {...props}
        >
            <path
              fill={props.fill || "#fff"}
              d="M3.321 8.135v-8H4.68v8H3.32ZM0 4.814V3.456h8v1.358H0Z"
            />
        </svg>
    )
}
