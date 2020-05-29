import React from 'react';

import './TermsFooter.scss';
export default class TermsFooter extends React.Component {
  render() {
    return (
      <div className="terms-footer">
        <div className="copyright">&copy; {new Date().getFullYear()} Ergeon Inc</div>
        By creating an account, you agree to the <br />
        <a
          href="https://s3-us-west-2.amazonaws.com/ergeon-terms/terms-of-use.pdf"
          rel="noopener noreferrer"
          target="_blank">Terms of Use</a> and&nbsp;
        <a
          href="https://s3-us-west-2.amazonaws.com/ergeon-terms/privacy-policy.pdf"
          rel="noopener noreferrer"
          target="_blank">Privacy Policy</a>
      </div>
    );
  }
}

