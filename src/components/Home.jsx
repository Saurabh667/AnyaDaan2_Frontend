import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import bg from '../assets/bg-image-ad.jpg'

const Home = () => {
  return (
    <>
    <div
      className="hero"
      style={{
        backgroundImage:{bg},
      }}
    >
      {/* Overlay */}
      <div className="hero-overlay" ></div>

      {/* Content */}
      <div className="hero-content">
        <h1 className="hero-title">
          Together, Let’s <span>End Food Waste</span>
        </h1>

        <p className="hero-text">
          Donate excess food to people in need. Every small act can make a big
          difference.
        </p>

        {/* Search */}
        <div className="search-wrapper">
          <div className="search-box">
            
          </div>
        </div>

        {/* Buttons */}
        <div className="hero-buttons">
          <Link to='/contribute'><button className="btn-primary">Contribute Now</button></Link>
          <Link to='/recentDonations'><button className="btn-secondary">Recieve</button></Link>
        </div>
      </div>
    </div>
    <section className="how-it-works">
      <h2 className="title">
        How It <span>Works</span>
      </h2>

      <p className="subtitle">
        Simple steps to make a big difference in reducing food waste and helping communities.
      </p>

      <div className="cards">
        <div className="card">
          <div className="icon green">🍴</div>
          <h3>Collect Surplus Food</h3>
          <p>
            We collaborate with restaurants, events, and individuals to collect
            surplus food safely.
          </p>
        </div>

        <div className="card">
          <div className="icon blue">👥</div>
          <h3>Connect with NGOs</h3>
          <p>
            Our network of verified NGOs helps ensure the food reaches people in
            need quickly.
          </p>
        </div>

        <div className="card">
          <div className="icon yellow">🚚</div>
          <h3>Deliver with Care</h3>
          <p>
            Food is transported in hygienic conditions by volunteers and
            delivery partners.
          </p>
        </div>

        <div className="card">
          <div className="icon red">❤️</div>
          <h3>Reduce Hunger</h3>
          <p>
            Every contribution helps reduce food waste and feed someone in need.
          </p>
        </div>
      </div>
    </section>
    <section className="impact">
      <h2 className="impact-title">
        Our <span>Impact</span>
      </h2>

      <p className="impact-subtitle">
        Every number here represents a life touched, a meal served, and a positive change created.
      </p>

      <div className="impact-cards">
        <div className="impact-card">
          <div className="icon green">
            🍴
          </div>
          <h3 className="number">1250+</h3>
          <p className="label">Meals Served</p>
        </div>

        <div className="impact-card">
          <div className="icon blue">
            👥
          </div>
          <h3 className="number">85+</h3>
          <p className="label">Volunteers</p>
        </div>

        <div className="impact-card">
          <div className="icon yellow">
            📍
          </div>
          <h3 className="number">5+</h3>
          <p className="label">Cities Covered</p>
        </div>

        <div className="impact-card">
          <div className="icon red">
            🤝
          </div>
          <h3 className="number">20+</h3>
          <p className="label">NGOs Partnered</p>
        </div>
      </div>
    </section>

    <section className="cta">
      <div className="cta-container">
        {/* Image */}
        <div className="cta-image">
          <img
            src="https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=80"
            alt="Food donation"
          />
        </div>

        {/* Content */}
        <div className="cta-content">
          <h2>
            Be the Change, <span>Contribute Today</span>
          </h2>

          <p>
            Your small act of kindness can feed a hungry person. Join our
            movement to reduce food waste and share happiness with those
            in need.
          </p>

          <div className="cta-buttons">
            <button className="btn primary"><Link to='/contribute' onClick={() => window.scrollTo(0, 0)}>Donate Food</Link></button>
            <button className="btn outline">Enquire</button>
          </div>
        </div>
      </div>
    </section>

        <section className="cta">
      <div className="cta-container">
        {/* Image */}
        <div className="cta-image">
          <img
            src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c"
            alt="Food donation"
          />
        </div>

        {/* Content */}
        <div className="cta-content">
          <h2>
            Our<span> Mission</span>
          </h2>

          <p>
            At AnyaDaan, our mission is to bridge the gap between surplus and scarcity. We empower communities by connecting food donors with organizations that serve those in need.

Through technology, compassion, and collaboration, we aim to reduce food waste and ensure every meal reaches the right plate.
          </p>

          <div className="cta-buttons">
            <Link to='/about'><button className="btn primary">Learn More</button></Link>
            {/* <button className="btn outline">Become a Volunteer</button> */}
          </div>
        </div>
      </div>
    </section>

    {/* CTA SECTION */}
      <section className="mission">
        <h1>
          Join Our Mission to <span>End Food Waste</span>
        </h1>

        <p>
          Every meal you save brings hope to someone in need. Become part of our
          growing community of changemakers today.
        </p>

        <div className="mission-buttons">
          {/* <button className="btn light" >Sign Up Now</button> */}
          <Link to="/signup" className='btn light'>SignUp</Link>

          <button className="btn outline-light"><Link to='/contribute'>Donate Today</Link></button>
        </div>
      </section>

      
      <Footer/>
    </>
  )
}

export default Home
