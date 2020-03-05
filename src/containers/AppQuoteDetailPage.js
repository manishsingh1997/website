import {connect} from 'react-redux';

import AppQuoteDetailPage from 'components/AppQuoteDetailPage';

const mapStateToProps = ({auth}) => {
  return {
    auth,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppQuoteDetailPage);
