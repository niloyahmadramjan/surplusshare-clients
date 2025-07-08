import React from 'react';
import Banner from './Banner';
import FeaturedDonations from './FeaturedDonations';
import CharityRequests from './CharityRequests';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedDonations></FeaturedDonations>
            <CharityRequests></CharityRequests>
        </div>
    );
};

export default Home;