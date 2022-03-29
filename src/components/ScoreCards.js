import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './ScoreCards.css'
const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function ScoreCard({title, score, details}) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }
   

    return (
        <div style={{display: 'flex', justifyContent: 'center', 'font-family': 'Red Hat Mono'}}>
            <Card className="card" sx={{width: 1 / 2, margin: 1, boxShadow: 3 }}>
                <CardContent sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                    <Typography style={{'font-family': 'Red Hat Mono'}}>{title + " score: " + score.score.toFixed(2) +" wage: " + score.wage }</Typography>
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
