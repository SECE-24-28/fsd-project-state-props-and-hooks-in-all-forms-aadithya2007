import { Link } from "react-router-dom";
import "../CSS/FaqPage.css";

const faqs = [
  {
    question: "How does VegiMart deliver fresh groceries?",
    answer:
      "VegiMart sources groceries from trusted local farms and suppliers, then packs each order carefully for delivery.",
  },
  {
    question: "How can I place an order on VegiMart?",
    answer:
      "Browse products, add items to your cart, and confirm checkout from your account.",
  },
];

function FaqPage() {
  return (
    <main className="page faq-page">
      <section className="split-hero">
        <div className="hero-text">
          <h1>VegiMart FAQ</h1>
          <p>Frequently asked questions about our grocery service.</p>
          <Link className="primary-btn" to="/shop">
            Shop Fresh
          </Link>
        </div>
      </section>

      <section className="faq-list">
        {faqs.map((faq) => (
          <details className="faq-item" key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>
    </main>
  );
}

export default FaqPage;
