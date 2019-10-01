import './projects-section.scss';
import React from 'react';
import PaneSwitcher from 'components/pane-switcher';
import {getParameterByName} from 'libs/utils/utils';

import photoNailUpProject from 'assets/promo-projects/dog-ear-fence@2x.png';
import photoPictureFrame from 'assets/promo-projects/goood-neighbor_updated.jpg';
import photoPictureFrameLattice from 'assets/promo-projects/goood-neighbor-lattice_updated.jpg';
import photoBrushed from 'assets/promo-projects/brushed_concrete.jpg';
import photoStamped from 'assets/promo-projects/stumped_concrete.jpg';
import photoPavers from 'assets/promo-projects/pavers.jpg';

class ProjectsSection extends React.Component {
  renderCard({img, title, content, link}) {
    return (
      <div className="card padding-20 soft-border">
        <div className="card__img-container">
          <img src={img}/>
        </div>
        <div className="card__content">
          <h2 className="additional-header h2 spacing after__is-6">{title}</h2>
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
          <div className="projects-section__project-cards" data-name="Fence projects">
            {this.renderCard({
              img: photoNailUpProject,
              title: 'Nail Up',
              content: 'This fence features non-overlapping 6 ft high ' +
                    'boards with curved tops on one side and the frame on the other side.',
              link: 'https://app.ergeon.com/projects-gallery/#/tags/nail-up',
            })}
            {this.renderCard({
              img: photoPictureFrame,
              title: 'Picture Frame',
              content: 'This fence features overlapping boards for added durability, ' +
                    'and each side of the fence looks identical. This is ideal for fences on shared boundary lines.',
              link: 'https://app.ergeon.com/projects-gallery/#/tags/picture-frame',
            })}
            {this.renderCard({
              img: photoPictureFrameLattice,
              title: 'Picture Frame with Lattice',
              content: 'This fence is the same as our Picture Frame Fence, ' +
                    'with a lattice on top for added height and privacy.',
              link: 'https://app.ergeon.com/projects-gallery/#/tags/lattice',
            })}
          </div>
          <div className="projects-section__project-cards" data-name="Driveway projects">
            {this.renderCard({
              img: photoBrushed,
              title: 'Brushed Concrete',
              content: 'Brushed Concrete This style of paving features poured concrete finished by pulling ' +
                    'a brush over the fresh concrete surface. Brushed Concrete is suitable for high vehicular ' +
                    'and foot traffic areas.',
              link: '',
            })}
            {this.renderCard({
              img: photoStamped,
              title: 'Stamped Concrete',
              content: 'This style of paving features poured concrete, then patterned stamped on top of the fresh ' +
                    'concrete surface. This finish will create patterns and textures that looks like natural stone.',
              link: '',
            })}
            {this.renderCard({
              img: photoPavers,
              title: 'Pavers',
              content: 'This style of paving features precast concrete and natural stone pavers that can come in ' +
                    'various modular sizes and shapes. This finish will create natural and geometric patterns.',
              link: '',
            })}
          </div>
        </PaneSwitcher>
      </div>
    );
  }
}
export default ProjectsSection;
