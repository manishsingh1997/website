import React from 'react';

import photoWoodenFences from 'assets/promo-projects/wooden-fences.jpg';
import photoGate from 'assets/promo-projects/gate-sliding.jpg';
import photoChainLink from 'assets/promo-projects/chain-link-fence.jpg';
import PaneSwitcher from './PaneSwitcher';

import './ProjectsSection.scss';

class ProjectsSection extends React.Component {
  renderCard({img, title, content, link}) {
    return (
      <div className="card padding-20 soft-border">
        <div className="card__img-container">
          <a href={link}>
            <img src={img} />
          </a>
        </div>
        <div className="card__content">
          <a href={link}>
            <h2 className="additional-header h2 spacing after__is-6">{title}</h2>
          </a>
          <p>{content}</p>
          <a href={link}>View more</a>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="projects-section">
        <h3 className="">Professional Installation Services</h3>
        <p>We provide installation services for residential and commercial properties</p>
        <PaneSwitcher defaultPane={0}>
          <div className="projects-section__project-cards" data-name="Fences and Gates">
            {this.renderCard({
              img: photoWoodenFences,
              title: 'Wooden Fences',
              content:
                'Wooden fences are easy to install, versatile and visually appealing.' +
                ' Choose from a variety of styles such as Nail Up, Picture Frame, with Lattice and more.',
              link: '/gallery/fence/picture-frame/without-lattice',
            })}
            {this.renderCard({
              img: photoChainLink,
              title: 'Chain Link Fences ',
              content:
                'Chain link fences are made of robust galvanized mesh and metal posts.' +
                ' It is a durable and cost effective option that can be built at different heights. ',
              link: '/gallery/fence/chain-link',
            })}
            {this.renderCard({
              img: photoGate,
              title: 'Gates',
              content:
                'Add a wooden or chain link gate. Choose from single gates,' +
                ' double swing gates or sliding gates. Customize your gate with arched tops or lattice. ',
              link: '/gallery/gate/sliding',
            })}
          </div>
        </PaneSwitcher>
      </div>
    );
  }
}
export default ProjectsSection;
