import React from 'react';
import PropTypes from 'prop-types';

export default class ProjectNotes extends React.Component {
  static propTypes = {
    quote: PropTypes.object,
  };

  render() {
    const {quote} = this.props;
    return (
      <React.Fragment>
        {quote['description_html'] && (
          <div className="quote-notes card padding-40 spacing after__is-30 page-break">
            <h4>Project notes</h4>
            <div className="quote-projects-notes">{
              // eslint-disable-next-line react/no-danger
            } <div dangerouslySetInnerHTML={{__html: quote['description_html']}}/>
            </div>
          </div>
        )}
      </React.Fragment>);
  }
}
