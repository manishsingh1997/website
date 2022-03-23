import React from 'react';

import {Button} from '@ergeon/core-components';
import imgHeart from '../../assets/about-page/ergeon_heart.svg';
import imgJenny from '../../assets/about-page/jenny@2x.jpg';
import imgOdysseas from '../../assets/about-page/odysseas@2x.jpg';
import imgLogoMark from '../../assets/about-page/logo_mark.png';

import './index.scss';

class AboutPage extends React.Component {
  render() {
    return (
      <div className="wrapper-1180">
        <div className="spacing before__is-48 after__is-48">
          <h1 className="center spacing after__is-12">
            Our mission
          </h1>
          <p className="subheader h2 center">
            Empower the world to build.
          </p>
        </div>
        <div className="values-container">
          <div className="values-item">
            <img alt="" className="image-24" src={imgHeart} />
            <h5>We invest in people</h5>
            <p className="values-item__subtitle">Making long term commitments to customers and team members.<br /></p>
          </div>
          <div className="values-item">
            <img alt="" className="image-24" src={imgHeart} />
            <h5 className="values-item__title">We are lean</h5>
            <p className="values-item__subtitle">Maximizing value for customers by minimizing waste.</p>
          </div>
          <div className="values-item">
            <img alt="" className="image-24" src={imgHeart} />
            <h5 className="values-item__title">We are kind</h5>
            <p className="values-item__subtitle">Setting new standards for fairness, empathy and respect.</p>
          </div>
        </div>
        <div className="about-section">
          <h3 className="spacing after__is-24">About Ergeon</h3>
          <p>
            We are disrupting the multi-trillion-dollar construction industry with a global skilled workforce and
            technology. We empower our customers, contractors, and staff to become their own superheroes.
            <br/><br/>
            We believe that projects should be done on time, on budget, and with reliable quality. Our customers
            are provided with the best support from a highly qualified global workforce and they have access to
            user-friendly, proprietary technology allowing them to visualize, plan and build their projects.
            This opens the door to fast, responsive, and friendly service, transparent pricing, and quality
            craftsmanship. As a result, any property owner can make their home better without any stress;
            and enjoy it more with their family and friends.
            <br/><br/>
            Starting with outdoor construction, we install the highest quality fence and hardscape projects and
            we are on track toward scaling to larger complex building projects. Over 6,000 happy customers are 
            now enjoying the fences and driveways we’ve built for them. We were named Best of HomeAdvisor 2020, 
            with over 1,500 public reviews at an average rating of 4.6. We work with homeowners in California and 
            Texas. We work with residential and commercial property owners in the Bay Area, Sacramento, Fresno,
            Riverside, San Bernardino, Orange County, Ventura, Los Angeles and Dallas. Our company was founded and
            is run today by two CS Ph.D. serial entrepreneurs.
            <br/><br/>
          </p>
          <div className="special-section">
            <div className="profiles">
              <div className="profile">
                <img alt="" className="profile__image" src={imgJenny} width="96" />
                <div className="profile__info">
                  <h5>Jenny He</h5>
                  <div className="label"><i>Founder and CEO</i></div>
                  <a className="linkedin-link" href="https://www.linkedin.com/in/jiayue-jenny-he-5a10762" rel="noopener noreferrer" target="_blank" >Linkedin</a>
                </div>
              </div>
              <div className="profile">
                <img alt="" className="profile__image" src={imgOdysseas} width="96" />
                <div className="profile__info">
                  <h5>Odysseas Tsatalos</h5>
                  <div className="label"><i>Founder and CTO</i></div>
                  <a className="linkedin-link" href="https://www.linkedin.com/in/tsatalos" rel="noopener noreferrer" target="_blank">Linkedin</a>
                </div>
              </div>
            </div>
            <div className="tile">
              <img alt="" src={imgLogoMark} width="67" />
              <p className="tile__description">
                If you crave an opportunity for impact and rapid career growth, join us!
              </p>
              <Button
                asAnchor
                className="min-width__is-120"
                flavor="secondary"
                href="/careers"
                size="large">Join us!
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutPage;
