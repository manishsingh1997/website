import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useHistory, useLocation, useParams} from 'react-router';
import {connect} from 'react-redux';
import {PopUp, TableRow, TopPanelMobile} from '@ergeon/core-components';
import IconArrowLeft from '@ergeon/core-components/src/assets/icon-arrow-left.svg';

import {getConfig} from 'api/app';
import AppLoader from 'components/common/AppLoader';
import UnknownErrorPage from 'components/UnknownErrorPage';
import {MAP_LABEL_TYPE, MAP_LABEL_YELLOW_TYPE, MAP_CIRCLE_TYPE} from 'website/constants';

import MapLabel from '../QuoteLine/MapLabel';

import './index.scss';

const BuildSpecs = () => {
  const {configID} = useParams();

  const [requestState, setRequestState] = useState({
    loading: true,
    error: null,
    data: null,
  });

  useEffect(
    function loadConfig() {
      getConfig(configID)
        .then(({data: responseData}) => {
          setRequestState({loading: false, error: null, data: responseData});
        })
        .catch((apiError) => {
          setRequestState({loading: false, error: apiError, data: null});
        });
    },
    [configID]
  );

  if (requestState.loading) {
    return <AppLoader />;
  }

  if (requestState.error) {
    return <UnknownErrorPage />;
  }

  return (
    <section className="BuildSpecs-table">
      {requestState.data.attributes.map(
        ({id, attribute, name, external_help_text: externalHelpText, public_help_node: publicHelpNode}, idx) => (
          <TableRow
            content={name}
            helpLink={publicHelpNode}
            helpText={externalHelpText}
            index={idx}
            key={id}
            label={attribute}
          />
        )
      )}
    </section>
  );
};

const BuildSpecsPopup = () => {
  const history = useHistory();
  const location = useLocation();

  const label = useMemo(() => location.state?.label, [location.state]);

  const [visible, setVisible] = useState(true);

  const title = useMemo(() => {
    switch (label?.type) {
      case MAP_LABEL_TYPE:
        return `Fence Side ${label.name}`;
      case MAP_LABEL_YELLOW_TYPE:
        return `Hardscape ${label.name}`;
      case MAP_CIRCLE_TYPE:
        return `Gate ${label.name}`;
      default:
        return;
    }
  }, [label]);

  const onHide = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(
    function processClose() {
      if (visible) return;
      if (!location.state) {
        // Handle direct visit in case someone wants to send a link
        const prevRoute = location.pathname.replace(/\/config\/\d+\/?$/, '');
        history.replace(prevRoute);
      } else {
        history.goBack();
      }
      return () => {
        // Reset body scroll affected by the PopUp’s render
        document.body.style.overflow = 'unset';
        document.body.style.height = 'unset';
      };
    },
    [history, location.pathname, location.state, visible]
  );

  return (
    <PopUp className="BuildSpecs-popup" onHide={onHide} scrollToTop={false} visible>
      <TopPanelMobile className="BuildSpecs-topPanel">
        <TopPanelMobile.Left>
          <button className="BuildSpecs-backBtn" onClick={onHide}>
            <img src={IconArrowLeft} />
          </button>
        </TopPanelMobile.Left>
        <TopPanelMobile.Center>
          {label && <MapLabel isInline name={label.name} type={label.type} />}
          <h3>{title}</h3>
        </TopPanelMobile.Center>
        <TopPanelMobile.Right />
      </TopPanelMobile>
      <div className="BuildSpecs-card card padding-60 soft-border shadow__z3">
        <h2 className="h5 BuildSpecs-title">
          {label && <MapLabel isInline name={label.name} type={label.type} />}
          <span>Build Specifications</span>
        </h2>
        <BuildSpecs />
      </div>
    </PopUp>
  );
};

export default connect()(BuildSpecsPopup);
