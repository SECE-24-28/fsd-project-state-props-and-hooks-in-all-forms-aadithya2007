import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import InfoCard from "./cards/InfoCard";
import { apiRequest } from "../api";
import aboutHeroImage from "../assets/page-images/About.png";
import aboutStoryImage from "../assets/page-images/about-story.svg";
import "../CSS/AboutUS.css";

const whyUs = [
  {
    title: "Fresh Products",
    text: "Farm fresh groceries every day.",
  },
  {
    title: "Fast Delivery",
    text: "Quick and safe doorstep delivery.",
  },
  {
    title: "Affordable Prices",
    text: "Best quality at best prices.",
  },
];

const reviews = [
  {
    quote: "Fresh vegetables and super fast delivery!",
    name: "Rahul",
  },
  {
    quote: "Affordable prices and amazing quality.",
    name: "Priya",
  },
  {
    quote: "Best grocery shopping experience.",
    name: "Arjun",
  },
];

function AboutUs() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiRequest("/categories")
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  return (
    <main className="page about-page">
      <section className="split-hero">
        <div className="hero-text">
          <h1>About VegiMart</h1>
          <p>
            Fresh groceries delivered directly from farms to your doorstep with
            care and quality.
          </p>
          <Link className="primary-btn" to="/shop">
            Shop Fresh
          </Link>
        </div>
        <div className="hero-image">
          <img src={aboutHeroImage} alt="Fresh groceries" />
        </div>
      </section>

      <section className="story">
        <div className="story-image">
          <img src={aboutStoryImage} alt="Fresh produce" />
        </div>
        <div className="story-text">
          <h2>Our Story</h2>
          <p>
            VegiMart started with a simple mission: to make healthy and organic
            groceries available for everyone.
          </p>
          <p>
            We work closely with local farmers and trusted suppliers to deliver
            the freshest vegetables, fruits, and daily essentials.
          </p>
        </div>
      </section>

      <section className="section centered">
        <h2>Why Choose Us</h2>
        <div className="info-grid">
          {whyUs.map((item, index) => (
            <InfoCard
              key={item.title}
              {...item}
              image={categories[index]?.image}
            />
          ))}
        </div>
      </section>

      <section className="mission">
        <InfoCard
          title="Our Mission"
          text="To provide healthy and organic food while supporting local farmers and sustainable farming."
        />
        <InfoCard
          title="Our Vision"
          text="To become the most trusted online grocery destination for every family."
        />
      </section>

      <section className="section centered">
        <h2>Customer Reviews</h2>
        <div className="info-grid">
          {reviews.map((review) => (
            <article className="info-card" key={review.name}>
              <p>"{review.quote}"</p>
              <h3>- {review.name}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="offer-strip">
        <h2>Start shopping fresh today</h2>
        <Link className="light-btn" to="/shop">
          Shop Now
        </Link>
      </section>
    </main>
  );
}

export default AboutUs;
