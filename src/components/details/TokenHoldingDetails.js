import React from "react";
import { Link, List, ListItem, ListItemText, ListSubheader } from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TokenHoldingScoreDetails({ details, address }) {
    const message = <div style={{ margin: 5 }}>
        This is a list of token holdings on your account {address}.
    </div>
    return <div>
        {message}
        {details.tokenHoldingList.length > 0 ?
            <TableContainer component={Paper}>
                <Table sx={{}} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{'font-family': 'Red Hat Mono'}}>Token Name</TableCell>
                            <TableCell style={{'font-family': 'Red Hat Mono'}} align="right">Average Amount [30 days]</TableCell>
                            <TableCell style={{'font-family': 'Red Hat Mono'}} align="right">Average Value [30 days in $]</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {details.tokenHoldingList.map(token => (
                            <TableRow
                                key={token.token}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {token.token}
                                </TableCell>
                                <TableCell style={{'font-family': 'Red Hat Mono'}} align="right">{(token.averageBalance / 10 ** token.decimals).toFixed(4)}</TableCell>
                                <TableCell style={{'font-family': 'Red Hat Mono'}} align="right">{(token.averageValue).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            : null
        }
    </div>
}