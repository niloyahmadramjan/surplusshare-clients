import React from "react";
import { Quote, Star } from "lucide-react";

const CommunityStories = () => {
  const stories = [
    {
      id: 1,
      name: "Maria Rodriguez",
      role: "Charity Director, Hope Kitchen",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b002?w=100&h=100&fit=crop",
      story:
        "FoodShare has transformed how we serve our community. We've been able to provide fresh, quality meals to over 500 families monthly. The platform makes coordination seamless.",
      impact: "500 families served monthly",
      rating: 5,
    },
    {
      id: 2,
      name: "Chef David Kim",
      role: "Owner, Green Bistro",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      story:
        "Instead of throwing away perfectly good food, we now contribute to our community. It feels amazing to know our surplus is feeding people in need rather than going to waste.",
      impact: "200kg food rescued weekly",
      rating: 5,
    },
    {
      id: 3,
      name: "Sarah Johnson",
      role: "Community Volunteer",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      story:
        "As a volunteer, I've seen firsthand how this platform brings together restaurants and charities. The impact on families who receive these donations is incredible.",
      impact: "50+ hours volunteered",
      rating: 5,
    },
  ];

 

  return (
    <section className="py-12 my-8 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
            Community Success Stories
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Hear from restaurants, charities, and volunteers who are making a difference in their communities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="card-body p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="avatar">
                    <div className="w-16 h-16 rounded-full">
                      <img src={story.avatar} alt={story.name} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-base-content">{story.name}</h4>
                    <p className="text-sm text-base-content/60">{story.role}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-secondary fill-secondary"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative mb-4">
                  <Quote className="h-8 w-8 text-accent absolute -top-2 -left-2" />
                  <blockquote className="leading-relaxed text-secondary pl-6">
                    "{story.story}"
                  </blockquote>
                </div>

                <div className="bg-primary/10 text-secondary text-sm font-medium text-center rounded-lg p-3">
                  {story.impact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityStories;
