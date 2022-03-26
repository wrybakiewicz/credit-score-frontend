import React from "react";
import {RotatingLines} from "react-loader-spinner";

export default function Loader() {

    return (
        <div className={"center"}>
            <RotatingLines className={"center"} width="100"/>
        </div>
    )
}