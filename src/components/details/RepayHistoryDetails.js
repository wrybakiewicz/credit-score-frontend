import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

export default function RepayHistoryDetails({details}) {
    if (details.length === 0) {
        return <div></div>;
    }
    return <div>
        <TableContainer component={Paper}>
            <Table sx={{}} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{'font-family': 'Red Hat Mono'}}>Token Name</TableCell>
                        <TableCell style={{'font-family': 'Red Hat Mono'}}>Token Symbol</TableCell>
                        <TableCell style={{'font-family': 'Red Hat Mono'}} align="right">Token amount</TableCell>
                        <TableCell style={{'font-family': 'Red Hat Mono'}} align="right">Repay date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {details.map(repayEntry => (
                        <TableRow
                            key={repayEntry.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row"
                                       style={{'font-family': 'Red Hat Mono'}}>{repayEntry.name}</TableCell>
                            <TableCell component="th" scope="row"
                                       style={{'font-family': 'Red Hat Mono'}}>{repayEntry.symbol}</TableCell>
                            <TableCell style={{'font-family': 'Red Hat Mono'}}
                                       align="right">{(repayEntry.amount / 10 ** repayEntry.decimals).toFixed(2)}</TableCell>
                            <TableCell style={{'font-family': 'Red Hat Mono'}}
                                       align="right">{repayEntry.dateTime}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
}