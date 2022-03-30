import React from "react";

export default function TwitterDetails({ details }) {
    if (details.twitterName) {
        return <div>
            Your Twitter name is <a href={`https://twitter.com/${details.twitterName}`} target={"_blank"}><b>{details.twitterName}</b></a> and you have <b>{details.followers}</b> followers,
            you are following <b>{details.followings}</b> accounts and you tweeted <b>{details.tweet_count}</b> times.
        </div>;
    } else {
        return <div>Address does not have Twitter.</div>
    }
}