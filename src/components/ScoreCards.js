import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './ScoreCards.css'
import {ExpandMore} from "./ExpandMore";

export default function ScoreCard({title, score, details}) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }


    return (
        <div style={{display: 'flex', justifyContent: 'center', 'font-family': 'Red Hat Mono'}}>
            <Card className="card" sx={{width: 1 / 2, margin: 1, boxShadow: 3}}>
                <CardContent sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                    <Typography
                        style={{'font-family': 'Red Hat Mono'}}>{title + " score: " + score.score.toFixed(2) + " weight: " + (score.wage)*100 +'%'}</Typography>
                    <Typography style={{'font-family': 'Red Hat Mono'}}> Details
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon/>
                        </ExpandMore>
                    </Typography>
                </CardContent>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {details}
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}
