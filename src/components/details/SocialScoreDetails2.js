import React from "react";
import {Link, List, ListItem, ListItemText, ListSubheader} from "@mui/material";

export default function SocialScoreDetails2({ details,address }) {
    {

        return <div>
            <p>This score is calculated based on address number of followers and number of accounts followed by address from <Link href={`https://app.cyberconnect.me/address/${address}`}
                target={"_blank"}>Cyber Connect</Link></p>
            You have <b>{details.followerCount}</b> followers and you are following <b>{details.followingCount}</b> accounts.
        </div>;
    }
}