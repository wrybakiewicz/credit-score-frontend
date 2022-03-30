import React from "react";

export default function SocialScoreDetails2({ details }) {
    {

        return <div>
            You have {details.followerCount} followers and you are following {details.followingCount} accounts.
        </div>;
    }
}