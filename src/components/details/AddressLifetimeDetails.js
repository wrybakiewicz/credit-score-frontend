import React from "react";

export default function AddressLifetimeDetails({details}) {
    if (details.created && details.lifetimeInDays) {
        return <div>
            First transaction on address was executed on <b>{details.created}</b> which
            was <b>{details.lifetimeInDays}</b> days ago
        </div>;
    } else {
        return <div>Address does not have transactions</div>
    }
}