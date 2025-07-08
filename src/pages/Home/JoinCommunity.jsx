import React from "react";

const JoinCommunity = () => {
  const stats = [
    {
      value: "180+",
      label: "Restaurant Partners",
    },
    {
      value: "95+",
      label: "Registered Charities",
    },
    {
      value: "500+",
      label: "Active Volunteers",
    },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-base-100 rounded-xl shadow-md p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-base-content mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-base-content/70 mb-8 max-w-2xl mx-auto">
            Be part of the solution. Whether you're a restaurant owner, charity director, or community volunteer, 
            there's a place for you in our mission to reduce food waste and feed communities.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-success/10 rounded-lg px-6 py-4 text-center"
              >
                <div className="text-2xl font-bold text-success">{stat.value}</div>
                <div className="text-sm text-success">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;
