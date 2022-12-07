import React from 'react';

import './TermsFooter.scss';
import classNames from 'classnames';

type TermsFooterProps = {
  className: string;
};

const TermsFooter = (props: TermsFooterProps) => {
  const {className} = props;
  const footerClassNames = classNames({
    'terms-footer': true,
    [className]: className,
  });

  return (
    <div className="terms-footer__wrapper" data-testid="footer-component">
      <div className={footerClassNames}>
        <div className="copyright">&copy; {new Date().getFullYear()} Ergeon Inc</div>
        By creating an account, you agree to the <br />
        <a
          href="https://s3-us-west-2.amazonaws.com/ergeon-terms/terms-of-use.pdf"
          rel="noopener noreferrer"
          target="_blank"
        >
          Terms of Use
        </a>{' '}
        and&nbsp;
        <a
          href="https://s3-us-west-2.amazonaws.com/ergeon-terms/privacy-policy.pdf"
          rel="noopener noreferrer"
          target="_blank"
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default TermsFooter;
