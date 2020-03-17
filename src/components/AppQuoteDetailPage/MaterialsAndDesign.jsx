import React from 'react';
import PropTypes from 'prop-types';

export default class MaterialsAndDesign extends React.Component {
  static propTypes = {
    designs: PropTypes.array,
  };

  render() {
    const {designs} = this.props;
    return (
      <React.Fragment>
        {designs.length > 0 &&
        <div className="quote-design-notes card padding-40 soft-border spacing after__is-48 page-break">
          <div>
            <h4 className="quote-design-notes__title">Materials and design</h4>
            <div className="quote-design-notes__content">
              {designs.map(({name, description, image}, id) => (
                <div className="quote-design-notes__content-item" key={id}>
                  <div className="quote-design-notes__img">
                    <img src={image} />
                  </div>
                  <div className="quote-design-notes__name">{name}</div>
                  {description && <p>{description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
        }
      </React.Fragment>);
  }
}
