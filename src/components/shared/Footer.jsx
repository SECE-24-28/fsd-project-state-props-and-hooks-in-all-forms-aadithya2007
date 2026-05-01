import { Link } from "react-router-dom";

const quickLinks = [
  ["Home", "/"],
  ["Shop", "/shop"],
  ["Categories", "/categories"],
  ["Offers", "/offers"],
  ["About Us", "/about"],
  ["FAQ", "/faq"],
  ["Contact", "/contact"],
];

const customerLinks = [
  ["My Orders", "/orders"],
  ["Track Order", "/track-order"],
  ["Returns & Refunds", "/returns"],
  ["Shipping Policy", "/shipping-policy"],
  ["Terms & Conditions", "/terms"],
  ["Privacy Policy", "/privacy-policy"],
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-box">
          <h2>VegiMart</h2>
          <p>
            Fresh groceries delivered directly from farms to your doorstep
            with care and quality.
          </p>

          <div className="social-icons" aria-label="Social links">
            <span>f</span>
            <span>ig</span>
            <span>x</span>
            <span>yt</span>
          </div>
        </div>

        <div className="footer-box">
          <h3>Quick Links</h3>

          {quickLinks.map(([label, to]) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </div>

        <div className="footer-box">
          <h3>Customer Care</h3>

          {customerLinks.map(([label, to]) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </div>

        <div className="footer-box">
          <h3>Contact Us</h3>
          <p>Phone: +91 98765 43210</p>
          <p>Email: support@vegimart.com</p>
          <p>123 Green Street, Farm Valley, India - 600001</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright 2025 VegiMart. All rights reserved.</p>

        <div className="payment-icons">
          <span>VISA</span>
          <span>MasterCard</span>
          <span>UPI</span>
          <span>Paytm</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;