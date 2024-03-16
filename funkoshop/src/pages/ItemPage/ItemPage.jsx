import "./ItemPage.css";
import { useParams } from "react-router-dom";

export default function ItemPage() {
    const params = useParams();
    console.log(params);
   return (
    <>
        <p style={{padding: "5px", backgroundColor: "coral", display: "inline-block"}}>Item page {params.itemId}</p>
    </>
   )
}