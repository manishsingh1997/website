import React from 'react';

import { OptimizedImage } from '@ergeon/core-components';

import PaneSwitcher from '../PaneSwitcher';

import { ProjectCard } from './types';
import './ProjectsSection.scss';

type ProjectsSectionProps = {
  cards: ProjectCard[],
};

const ProjectsSection = ({ cards }: ProjectsSectionProps) => {
  return (
    <div className="projects-section">
      <h2 className="h3">Responsive, Professional Installation Services</h2>
      <p>We provide installation services for residential and commercial properties</p>
      <PaneSwitcher defaultPane={0}>
        <div className="projects-section__project-cards" data-name="Fences and Gates">
          {cards.map((card, idx) => (
            <div className={`card card-${idx + 1} padding-20 soft-border`} key={`${card.title}-${idx}`}>
              <div className="card__img-container">
                <a href={card.link}>
                  <OptimizedImage alt={card.title} src={card.image} />
                </a>
                <div className="card__img-additional-icon" />
              </div>
              <div className="card__content">
                <h3 className="additional-header h2 spacing after__is-6">
                  <a href={card.link} style={{ color: 'inherit' }}>
                    {card.title}
                  </a>
                </h3>
                <p>{card.content}</p>
                {card.link &&
                  <a href={card.link}>View more</a>
                }
              </div>
            </div>
          ))}
        </div>
      </PaneSwitcher>
    </div>
  );
};

export default ProjectsSection;
