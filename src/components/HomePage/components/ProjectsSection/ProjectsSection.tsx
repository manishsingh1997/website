import React from 'react';

import homeData from '../../home-data.json';
import PaneSwitcher from '../PaneSwitcher';
import './ProjectsSection.scss';

const CARDS_IMAGES: Record<string, string> = {
  '/gallery/fence/picture-frame/without-lattice': require('assets/promo-projects/f-m-1@2x.jpg'),
  '/gallery/fence/chain-link': require('assets/promo-projects/chain-link-render@2x.jpg'),
  '/gallery/fence/vinyl': require('assets/promo-projects/7-ft-solid-privacy-with-lattice@2x.jpg'),
  '/gallery/fence/boxed-frame': require('assets/promo-projects/box-wire-render@2x.jpg'),
  '/gallery/gate/sliding': require('assets/promo-projects/g-m-3-2@2x.jpg'),
  '/gallery/fence/staining/transparent': require('assets/promo-projects/stained-render@2x.jpg'),
};

const ProjectsSection = () => {
  return (
    <div className="projects-section">
      <h2 className="h3">Responsive, Professional Installation Services</h2>
      <p>We provide installation services for residential and commercial properties</p>
      <PaneSwitcher defaultPane={0}>
        <div className="projects-section__project-cards" data-name="Fences and Gates">
          {homeData.cards.map((card, idx) => (
            <div className="card padding-20 soft-border" key={`${card.title}-${idx}`}>
              <div className="card__img-container">
                <a href={card.link}>
                  <img src={CARDS_IMAGES[card.link]} />
                </a>
              </div>
              <div className="card__content">
                <h3 className="additional-header h2 spacing after__is-6">
                  <a href={card.link} style={{color: 'inherit'}}>{card.title}</a>
                </h3>
                <p>{card.content}</p>
                <a href={card.link}>View more</a>
              </div>
            </div>
          ))}
        </div>
      </PaneSwitcher>
    </div>
  );
};

export default ProjectsSection;
