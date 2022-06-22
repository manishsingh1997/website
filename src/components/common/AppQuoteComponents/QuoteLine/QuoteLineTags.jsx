import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '@ergeon/core-components';
import {isPDFMode} from '../../../../utils/utils';

/**
 * Renders group of tag buttons
 * @param {{ tags: Array.<object>}} props
 */
export default function Tags({tags}) {
  const pdfModeDisabled = !isPDFMode();
  let tagsNode = null;

  if (pdfModeDisabled && tags && tags.length) {
    tagsNode = (
      <div className="quote-line-description__tags">
        <div>
          {tags.map((tag, index) => {
            const {name, url} = tag;

            return (
              <Button asAnchor className="tags__item" href={url} key={index} size="small" taste="line">
                {name}
              </Button>
            );
          })}
        </div>
      </div>
    );
  }

  return tagsNode;
}

Tags.propTypes = {
  tags: PropTypes.array,
};
