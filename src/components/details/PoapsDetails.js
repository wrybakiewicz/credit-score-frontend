import {ImageList, ImageListItem, ImageListItemBar} from "@mui/material";
import React from "react";

export default function PoapsDetails({details}) {
    if (details.poaps.length > 0) {
        return <ImageList>
            {details.poaps.map((item) => (
                <ImageListItem key={item.name}>
                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.name}
                        subtitle={<span>{item.dateTime}</span>}
                        position="below"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    } else {
        return <div>Address has no POAPs</div>
    }
}