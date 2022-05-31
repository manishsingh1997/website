import './PaneSwitcher.scss';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class PaneSwitcher extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    defaultPane: PropTypes.number,
  };
  constructor(props) {
    const children = React.Children.toArray(props.children);
    
    super();
    this.state = {
      tabsCount: (children && children.length) || 0,
      currentPane: props.defaultPane || 0,
      tabNames: children && children.map((child) => child.props['data-name']),
    };
  }
  switchPane(paneIndex) {
    this.setState({currentPane: paneIndex});
  }
  renderTabs(state) {
    const tabs = [];
    for (let i = 0; i < state.tabNames.length; i++) {
      const tabClasses = classNames({
        tab: true,
        active: state.currentPane === i,
      });
      tabs.push(
        <div className={tabClasses} key={i} onClick={this.switchPane.bind(this, i)}>
          {state.tabNames[i]}
        </div>
      );
    }
    return <div className="tab-switcher bottom-line">{tabs.map((tab) => tab)}</div>;
  }
  render() {
    const children = React.Children.toArray(this.props.children);
    const {tabNames, currentPane} = this.state;
    return (
      <div className="panes">
        {this.renderTabs({tabNames, currentPane})}
        {children.map((pane, index) => {
          const paneClasses = classNames({
            pane: true,
            active: index === currentPane,
          });
          return (
            <div className={paneClasses} key={index}>
              {pane}
            </div>
          );
        })}
      </div>
    );
  }
}
export default PaneSwitcher;
