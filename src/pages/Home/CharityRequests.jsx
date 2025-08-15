import React from "react";

const CharityRequests = () => {
  const requests = [
    {
      id: 1,
      charityName: "City Food Bank",
      charityImage:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=100&h=100&fit=crop",
      donationTitle: "Fresh Bakery Items from Golden Crust",
      description:
        "We urgently need fresh bakery items for our weekend distribution to 200+ families in the downtown area. Our volunteers will pick up within 2 hours.",
      requestDate: "2 hours ago",
      priority: "Urgent",
      beneficiaries: "200+ families",
    },
    {
      id: 2,
      charityName: "Hope Kitchen",
      charityImage:
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=100&h=100&fit=crop",
      donationTitle: "Prepared Meals from Bistro Central",
      description:
        "Looking for prepared meals to serve at our evening meal program. We can accommodate up to 50 portions for tonight's service.",
      requestDate: "4 hours ago",
      priority: "High",
      beneficiaries: "50 individuals",
    },
    {
      id: 3,
      charityName: "Community Care Center",
      charityImage:
        "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=100&h=100&fit=crop",
      donationTitle: "Fresh Produce from Green Market",
      description:
        "We operate a weekly food pantry and would love to include fresh produce in our distribution packages for local families in need.",
      requestDate: "6 hours ago",
      priority: "Medium",
      beneficiaries: "150 families",
    },
  ];

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "Urgent":
        return "badge-error";
      case "High":
        return "badge-warning";
      case "Medium":
        return "badge-info";
      default:
        return "badge-neutral";
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((w) => w[0])
      .join("");
  };

  return (
    <section className="py-8 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
            Latest Charity Requests
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            See how local charities are actively working to distribute food
            donations to communities in need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <div key={request.id} className="card shadow-md bg-base-200">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full">
                        <img
                          src={request.charityImage}
                          alt={request.charityName}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base-content text-lg">
                        <span>{getInitials(request.charityName)}</span>

                      </h3>
                      <p className="text-sm text-base-content/60 flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {request.requestDate}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`badge ${getPriorityClass(request.priority)}`}
                  >
                    {request.priority}
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold text-base-content">
                    Requesting: {request.donationTitle}
                  </h4>
                  <p className="text-sm text-base-content/70 mt-2 leading-relaxed">
                    {request.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-base-300 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-base-content/60">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Serving {request.beneficiaries}</span>
                  </div>
                  <span className="text-primary font-medium">
                    Active Request
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CharityRequests;
