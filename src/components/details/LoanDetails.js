import React from "react";
import LoanDetailsCard from "./LoanDetailsCard";
import {Link} from "@mui/material";
import BorrowHistoryDetails from "./BorrowHistoryDetails";
import RepayHistoryDetails from "./RepayHistoryDetails";
import LiquidationHistoryDetails from "./LiquidationHistoryDetails";

export default function LoanDetails({details}) {
    if(details.borrowHistory.length > 0 || details.repayHistory.length > 0 || details.liquidationHistory.length > 0) {
        return <div>
            <div style={{ margin: 5 }}>
                This is a details of loans taken out in <Link href={`https://app.aave.com/`} target={"_blank"}>Aave</Link>
            </div>
            <LoanDetailsCard title={"Borrow history"} details={<BorrowHistoryDetails details={details.borrowHistory}/>} />
            <LoanDetailsCard title={"Repay history"} details={<RepayHistoryDetails details={details.repayHistory}/>}/>
            <LoanDetailsCard title={"Liquidation history"} details={<LiquidationHistoryDetails details={details.liquidationHistory}/>}/>
        </div>
    } else {
        return <div style={{ margin: 5 }}>
                No loans was taken out in <Link href={`https://app.aave.com/`} target={"_blank"}>Aave</Link>
            </div>
    }
}