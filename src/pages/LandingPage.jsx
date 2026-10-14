import {
  ArrowRightOutlined,
  CheckCircleFilled,
  ClockCircleOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import "./LandingPage.css";

const services = [
  {
    number: "01",
    name: "Dry cleaning",
    description: "Thoughtful care for suits, dresses, and the pieces you love.",
    icon: "✳",
  },
  {
    number: "02",
    name: "Wash & fold",
    description: "Everyday laundry, returned fresh, folded, and ready to wear.",
    icon: "≋",
  },
  {
    number: "03",
    name: "Pressing",
    description: "A crisp, polished finish for shirts, linens, and special days.",
    icon: "⌁",
  },
];

const steps = [
  ["01", "Book a pickup", "Choose a time that works for you. We’ll come to your door."],
  ["02", "We work our magic", "Our garment-care team gives every item personal attention."],
  ["03", "Fresh, right back", "Your clothes return clean, carefully finished, and on time."],
];

function LandingPage() {
  return (
    <main className="landing-page">
      <header className="landing-header">
        <a className="landing-brand" href="#home" aria-label="Classic Dry Clean home">
          <span className="brand-mark">C</span>
          <span className="brand-name">
            CLASSIC
            <span>DRY CLEAN</span>
          </span>
        </a>

        <nav className="landing-nav" aria-label="Main navigation">
          <a href="#services">Our services</a>
          <a href="#how-it-works">How it works</a>
          <a href="#about">Why Classic</a>
        </nav>

        <Link className="landing-header-cta" to="/createOrder">
          Book a pickup <ArrowRightOutlined />
        </Link>
      </header>

      <section className="landing-hero" id="home">
        <div className="hero-copy">
          <span className="eyebrow"><span /> CARE THAT COMES TO YOU</span>
          <h1>
            Your clothes,
            <br />
            <span>in good hands.</span>
          </h1>
          <p className="hero-description">
            A little more care for the clothes you love. Premium dry cleaning
            and laundry, picked up and delivered on your schedule.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/createOrder">
              Schedule a pickup <ArrowRightOutlined />
            </Link>
            <a className="button button-text" href="#services">
              Explore services <span>↓</span>
            </a>
          </div>
          <div className="hero-trust">
            <span className="trust-icon"><CheckCircleFilled /></span>
            <span>Carefully cleaned</span>
            <span className="trust-divider" />
            <span>Right to your door</span>
          </div>
        </div>

        <div className="hero-art" role="img" aria-label="Freshly cleaned clothes ready for delivery">
          <div className="hero-photo" />
          <div className="photo-wash" />
          <div className="floating-note">
            <span className="note-icon"><SafetyCertificateOutlined /></span>
            <span><strong>Made fresh</strong><small>Handled with care</small></span>
          </div>
          <div className="floating-review">
            <span className="review-stars" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }, (_, index) => <StarFilled key={index} />)}
            </span>
            <span><strong>A little extra care.</strong><small>Every single time.</small></span>
          </div>
          <div className="hero-image-caption">
            <span>THE CLASSIC STANDARD</span>
            <span>EST. WITH CARE</span>
          </div>
        </div>

        <div className="hero-side-note"><span>GOOD CLOTHES. GOOD CARE.</span></div>
      </section>

      <section className="service-strip" aria-label="Our promises">
        <div><ClockCircleOutlined /><span><strong>On your schedule</strong><small>Pickup & delivery that fits your day</small></span></div>
        <div><SafetyCertificateOutlined /><span><strong>Care in every detail</strong><small>Expert hands, considered methods</small></span></div>
        <div><EnvironmentOutlined /><span><strong>Right to your door</strong><small>Local care, made wonderfully easy</small></span></div>
      </section>

      <section className="landing-section services-section" id="services">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A BETTER KIND OF CLEAN</span>
            <h2>Care for every kind<br />of <em>everyday.</em></h2>
          </div>
          <p>From your Monday essentials to that one-of-a-kind occasion piece, we give every garment the care it deserves.</p>
        </div>
        <div className="service-cards">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-card-top"><span>{service.number}</span><span className="service-icon" aria-hidden="true">{service.icon}</span></div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <Link to="/createOrder" aria-label={`Book ${service.name}`}>
                Book this service <ArrowRightOutlined />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="how-section" id="how-it-works">
        <div className="how-intro">
          <span className="eyebrow">A FEW EASY STEPS</span>
          <h2>More fresh.<br /><em>Less fuss.</em></h2>
          <p>Good garment care should fit into your life, not the other way around.</p>
          <Link className="button button-light" to="/createOrder">Let’s get started <ArrowRightOutlined /></Link>
        </div>
        <div className="steps-list">
          {steps.map(([number, title, description]) => (
            <article className="step" key={number}>
              <span className="step-number">{number}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
              <span className="step-check"><CheckCircleFilled /></span>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <span className="about-spark" aria-hidden="true">✳</span>
        <span className="eyebrow">THE CLASSIC DIFFERENCE</span>
        <h2>Good care is more than clean.<br /><em>It’s how we make you feel.</em></h2>
        <p>We believe the little things matter: a careful finish, a friendly doorstep handoff, and knowing your favourite pieces are in good hands.</p>
        <div className="about-quote">
          <span className="quote-stars" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }, (_, index) => <StarFilled key={index} />)}
          </span>
          <blockquote>“The easiest part of my week. My clothes come back looking wonderful.”</blockquote>
          <span className="quote-credit">A HAPPY CLASSIC CUSTOMER</span>
        </div>
      </section>

      <section className="final-cta">
        <div><span className="eyebrow">A FRESH START IS JUST A PICKUP AWAY</span><h2>Ready when <em>you are.</em></h2></div>
        <Link className="button button-primary" to="/createOrder">Book your first pickup <ArrowRightOutlined /></Link>
      </section>

      <footer className="landing-footer">
        <a className="landing-brand footer-brand" href="#home" aria-label="Classic Dry Clean home">
          <span className="brand-mark">C</span>
          <span className="brand-name">CLASSIC<span>DRY CLEAN</span></span>
        </a>
        <span>Good clothes deserve good care.</span>
        <span>© {new Date().getFullYear()} Classic Dry Clean</span>
      </footer>
    </main>
  );
}

export default LandingPage;
