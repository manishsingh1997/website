import React from 'react';
import MetaTags from 'react-meta-tags';

import {Button} from '@ergeon/core-components';
import imgHeart from '../assets/about-page/ergeon_heart.svg';
import imgJenny from '../assets/about-page/jenny@2x.jpg';
import imgOdysseas from '../assets/about-page/odysseas@2x.jpg';
import imgLogoMark from '../assets/about-page/logo_mark.png';
import './about-page.scss';
class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <MetaTags>
          <title>Company Mission</title>
          <meta
            content={`Ergeon is a tech-enabled general contractor that provides consumers a simpler,
            faster and better value home improvement experience. Ergeon is founded by two CS PhD serial entrepreneurs
            that share a passion for shaping the Future of Work.`}
            name="description"/>
          <meta
            content={`Ergeon is a tech-enabled general contractor that provides consumers a simpler,
            faster and better value home improvement experience. Ergeon is founded by two CS PhD serial entrepreneurs
            that share a passion for shaping the Future of Work.`}
            property="og:description"/>
        </MetaTags>

        <div className="wrapper-1180">
          <div className="spacing before__is-48 after__is-48">
            <h1 className="center spacing after__is-12">
                Our mission
            </h1>
            <p className="subheader h2 center">
                Simplify home improvement <br/>by empowering skilled local contractors
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
              We set out in 2018 to disrupt the multi trillion dollar construction space with technology.&nbsp;
              Ergeon is a tech-enabled general contractor that provides consumers a simpler, faster and better
              value home improvement experience.&nbsp; We create custom and transparent solution for each project
              leveraging multiple large data sets and deep construction expertise. &nbsp;Ergeon also empowers local
              skilled contractors to scale by taking on their front &amp; back office operations.<br /><br />
              Ergeon is founded by two CS PhD serial entrepreneurs that share a passion for using technology to
              change how work is performed.&nbsp; We embrace being an all-remote company, read more&nbsp;
              <a href="https://medium.com/ergeon">here</a>.&nbsp; Ergeon has been growing extremely fast, and we
              have already helped over 500 customers. We are looking for top talent to be part of our world class
              team — join us in democratizing&nbsp; the $250B+ home improvement market!&nbsp;<br />
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
      </div>
    );
  }
}

export default AboutPage;