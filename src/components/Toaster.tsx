import React from "react";
import { Toaster } from "react-hot-toast";

export function ToasterComponent() {

    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    )
}