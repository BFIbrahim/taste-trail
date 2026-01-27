import React from "react";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section className="bg-white px-6 md:px-0 lg:px-0">
      <div className=" flex flex-col-reverse lg:flex-row items-center justify-between py-12">
        
        <div className="text-center lg:text-left lg:w-1/2 space-y-4">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-primary leading-tight">
            <span className="text-secondary">Personalized</span> Recipes
          </h1>
          <p className=" text-accent">
            Discover new recipes and plan your meals smarter. TasteTrail makes cooking easy, fun, and stress-free!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mt-8">
            <Link
              to="/register"
              className="btn btn-primary btn-lg text-white px-10 py-4 text-xl"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="lg:w-1/2 flex justify-center mb-10 lg:mb-0">
          <img
            src="https://cdn.shopify.com/s/files/1/0445/1365/6985/files/elements-of-cooking-flavor-profiling.jpg?v=1638211100"
            alt="Cooking Illustration"
            className="w-full max-w-lg rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
