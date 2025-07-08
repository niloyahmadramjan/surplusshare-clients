import React from "react";
import { TrendingUp, Leaf, Heart, Utensils } from "lucide-react";

const ImpactStats = () => {
  const stats = [
    {
      icon: Utensils,
      value: "2.5M",
      label: "Meals Saved",
      description: "Total meals rescued from waste",
      trend: "+15% this month",
      color: "text-success",
    },
    {
      icon: Leaf,
      value: "850",
      label: "Tons CO₂ Prevented",
      description: "Environmental impact reduction",
      trend: "+22% this month",
      color: "text-primary",
    },
    {
      icon: Heart,
      value: "12.8K",
      label: "People Fed",
      description: "Community members served",
      trend: "+18% this month",
      color: "text-secondary",
    },
    {
      icon: TrendingUp,
      value: "340",
      label: "Partner Network",
      description: "Restaurants & charities connected",
      trend: "+8% this month",
      color: "text-info",
    },
  ];

  return (
    <section className="py-16 bg-secondary text-primary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Environmental Impact
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Together, we're making a measurable difference in reducing food waste and feeding communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="card shadow-md bg-primary-content/10 hover:bg-primary-content/20 transition-colors"
              >
                <div className="card-body items-center text-center p-6">
                  <div className="bg-primary-content/20 p-3 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-primary-content" />
                  </div>
                  <div className="text-3xl font-bold text-primary-content">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-primary-content">
                    {stat.label}
                  </div>
                  <div className="text-sm text-primary-content/80">
                    {stat.description}
                  </div>
                  <div className={`text-sm font-medium ${stat.color}`}>
                    {stat.trend}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="bg-primary-content/10 rounded-lg p-6 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-primary-content mb-2">
              Real-Time Impact Tracking
            </h3>
            <p className="text-primary-content/80">
              Every donation made through our platform is tracked to measure its environmental and social impact. 
              Join us in creating a sustainable future, one meal at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
