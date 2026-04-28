import { Link } from "react-router-dom";
import offersHeroImage from "../assets/page-images/prod.png";
import "../CSS/OffersPage.css";

const offers = [
  {
    title: "50% OFF",
    text: "On your first order above Rs. 999",
    action: "Claim Offer",
  },
  {
    title: "Free Delivery",
    text: "Orders above Rs. 500",
    action: "Order Now",
  },
];

function OffersPage() {
  return (
    <main className="page offers-page">
      <section className="page-hero centered">
        <div className="page-hero-text">
          <h1>Special Offers</h1>
          <p>Save more on your favorite groceries.</p>
        </div>
        <img src={offersHeroImage} alt="Fresh grocery offers" />
      </section>

      <section className="offer-container">
        {offers.map((offer) => (
          <article className="offer-card" key={offer.title}>
            <h2>{offer.title}</h2>
            <p>{offer.text}</p>
            <Link className="light-btn" to="/shop">
              {offer.action}
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

export default OffersPage;
