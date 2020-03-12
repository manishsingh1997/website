import React from 'react';
import MetaTags from 'react-meta-tags';
import {MetaData} from '../../data/meta-data';
import PropTypes from 'prop-types';

class MetaDescription extends React.Component {
  static propTypes = {
    pageName: PropTypes.string,
  };
  addMetaTags(pageName) {
    return (
      <MetaTags>
        <title>{MetaData[pageName].title}</title>
        <meta
          content={MetaData[pageName].description}
          name="description"/>
        <meta
          content={MetaData[pageName].description}
          property="og:description"/>
      </MetaTags>
    );
  }
  render() {
    const {pageName} = this.props;
    return MetaData[pageName]? this.addMetaTags(pageName) : null;
  }
}

export default MetaDescription;