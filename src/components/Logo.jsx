import { Leaf } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div>
      <Link to="/" className="flex items-center gap-2">
        <div className="bg-primary p-2 rounded-lg">
          <Leaf className="h-5 w-5 text-secondary" />
        </div>
        <span className="text-xl font-bold text-accent">SurplusShare</span>
      </Link>
    </div>
  );
};

export default Logo;
