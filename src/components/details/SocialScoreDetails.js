import React from "react";
import {Link, List, ListItem, ListItemText, ListSubheader} from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';

export default function SocialScoreDetails({details, address}) {
    const message = <div>
        This score is calculated based on address friends scores from <Link href={`https://app.cyberconnect.me/address/${address}`}
                                                                            target={"_blank"}>Cyber Connect</Link>
    </div>
    return <div>
        {message}
        {
            details.friends.length > 0 ? <List
                subheader={<ListSubheader>Friends</ListSubheader>}>
                {
                    details.friends.map(friend => {
                        return <ListItem key={friend}>
                            <ListItemText primary={friend}/>
                            <Link href={`https://app.cyberconnect.me/address/${friend}`}
                                  target={"_blank"}>
                                <LinkIcon/>
                            </Link>
                        </ListItem>;
                        // return <div key={friend}><Link href={`https://app.cyberconnect.me/address/${friend}`}
                        //                         target={"_blank"}>{friend}</Link></div>
                    })
                }
            </List> : null
        }
    </div>
}