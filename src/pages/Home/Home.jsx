import React from 'react';
import Banner from './Banner';
import FeaturedDonations from './FeaturedDonations';
import CharityRequests from './CharityRequests';
import ImpactStats from './ImpactStats';
import CommunityStories from './CommunityStories';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedDonations></FeaturedDonations>
            <CharityRequests></CharityRequests>
            <ImpactStats></ImpactStats>
            <CommunityStories></CommunityStories>
        </div>
    );
};

export default Home;