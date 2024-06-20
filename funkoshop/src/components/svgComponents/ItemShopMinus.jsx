import * as React from "react"

export default function ItemShopMinus(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={6}
            height={2}
            fill={props.fill}
            {...props}
        >
            <path fill={props.fill || "#fff"} d="M6 .635v1H0v-1h6Z" />
        </svg>
    )
}