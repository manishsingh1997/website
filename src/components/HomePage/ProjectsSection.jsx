import React from 'react';
import {getParameterByName} from 'utils/utils';

import photoPictureFrame from 'assets/promo-projects/goood-neighbor_updated.jpg';
import photoGate from 'assets/promo-projects/gate-sliding.jpg';
import photoChainLink from 'assets/promo-projects/chain-link-fence.jpg';
import photoBrushed from 'assets/promo-projects/brushed_concrete.jpg';
import photoStamped from 'assets/promo-projects/stumped_concrete.jpg';
import photoEnhanced from 'assets/promo-projects/enhanced_concrete.jpg';
import PaneSwitcher from './PaneSwitcher';

import './ProjectsSection.scss';

class ProjectsSection extends React.Component {
  renderCard({img, title, content, link}) {
    return (
      <div className="card padding-20 soft-border">
        <div className="card__img-container">
          <a href={link}>
            <img src={img}/>
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
        <h3 className=""> Professional Installation Services</h3>
        <PaneSwitcher defaultPane={getParameterByName('utm_content') === 'driveway' ? 1 : 0}>
          <div className="projects-section__project-cards" data-name="Fences and Gates Projects">
            {this.renderCard({
              img: photoPictureFrame,
              title: 'Wooden Fences',
              content: 'Wooden fences are easy to install, versatile and visually appealing.' +
                ' Choose from a variety of styles such as Nail Up, Picture Frame, with Lattice and more.',
              link: '/gallery/fence/picture-frame/without-lattice',
            })}
            {this.renderCard({
              img: photoChainLink,
              title: 'Chain Link Fences ',
              content: 'Chain link fences are made of robust galvanized mesh and metal posts.' +
                ' It is a durable and cost effective option that can be built at different heights. ',
              link: '/gallery/fence/chain-link',
            })}
            {this.renderCard({
              img: photoGate,
              title: 'Gates',
              content: 'Add a wooden or chain link gate. Choose from single gates,' +
                ' double swing gates or sliding gates. Customize your gate with arched tops or lattice. ',
              link: '/gallery/gate/sliding',
            })}
          </div>
          <div className="projects-section__project-cards" data-name="Hardscape Projects">
            {this.renderCard({
              img: photoBrushed,
              title: 'Brushed Concrete',
              content: 'This style of paving features poured concrete finished by pulling ' +
                    'a brush over the fresh concrete surface. Brushed Concrete is suitable for high vehicular ' +
                    'and foot traffic areas.',
              link: '/gallery/driveway/brushed/natural',
            })}
            {this.renderCard({
              img: photoStamped,
              title: 'Stamped Concrete',
              content: 'This style of paving features poured concrete, then patterned stamped on top of the fresh ' +
                    'concrete surface. This finish will create patterns and textures that looks like natural stone.',
              link: '/gallery/driveway/stamped/casual',
            })}
            {this.renderCard({
              img: photoEnhanced,
              title: 'Enhanced Concrete',
              content: 'Exposed aggregate concrete is the universal term for concrete which incorporates ' +
                    'natural stones, like pebbles, applied into the top layer of poured concrete. ' +
                    'The result is a timeless look with unmatched durability.',
              link: '/gallery/driveway/enhanced/enhanced',
            })}
          </div>
        </PaneSwitcher>
      </div>
    );
  }
}
export default ProjectsSection;
