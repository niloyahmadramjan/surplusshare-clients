import React from 'react';
import Banner from './Banner';
import FeaturedDonations from './FeaturedDonations';
import CharityRequests from './CharityRequests';
import ImpactStats from './ImpactStats';
import CommunityStories from './CommunityStories';
import JoinCommunity from './JoinCommunity';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedDonations></FeaturedDonations>
            <CharityRequests></CharityRequests>
            <ImpactStats></ImpactStats>
            <CommunityStories></CommunityStories>
            <JoinCommunity></JoinCommunity>
        </div>
    );
};

export default Home;