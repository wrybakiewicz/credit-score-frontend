import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

export default function BorrowHistoryDetails({details}) {
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
                        <TableCell style={{'font-family': 'Red Hat Mono'}} align="right">Borrow date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {details.map(borrowEntry => (
                        <TableRow
                            key={borrowEntry.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row"
                                       style={{'font-family': 'Red Hat Mono'}}>{borrowEntry.name}</TableCell>
                            <TableCell component="th" scope="row"
                                       style={{'font-family': 'Red Hat Mono'}}>{borrowEntry.symbol}</TableCell>
                            <TableCell style={{'font-family': 'Red Hat Mono'}}
                                       align="right">{(borrowEntry.amount / 10 ** borrowEntry.decimals).toFixed(2)}</TableCell>
                            <TableCell style={{'font-family': 'Red Hat Mono'}}
                                       align="right">{borrowEntry.dateTime}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
}