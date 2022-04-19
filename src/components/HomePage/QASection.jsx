import React from 'react';
import {Link} from 'react-router-dom';
import PaneSwitcher from './PaneSwitcher';
import {getParameterByName} from 'utils/utils';
import {getNodes} from 'api/node';
import {parseAPIError} from 'utils/api';
import {Spinner} from '@ergeon/core-components';
import './QASection.scss';

const FENCE_NODES = ['201900373', '202000553', '201900363', '201900318'];
const DRIVEWAYS_NODES = ['201900007', '201900009', '201900011', '201900010'];

class QASection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      questions: [],
    };
  }
  async componentDidMount() {
    await this.fetchQuestions();
  }
  async fetchQuestions() {
    const NODES = [...FENCE_NODES, ...DRIVEWAYS_NODES];
    try {
      const data = await getNodes(NODES);
      this.setState({
        questions: data.data || [],
        nodesError: false,
        isLoading: false,
      });
    } catch (apiError) {
      this.setState({
        questions: [],
        nodesError: parseAPIError(apiError),
        isLoading: false,
      });
    }
  }
  renderSpinner() {
    const {isLoading} = this.state;
    return (
      <div className="qa-section__loader">
        <Spinner
          active={isLoading} borderWidth={0.10} color="blue" size={64} />
      </div>
    );
  }
  renderQuestions(type) {
    const {questions = []} = this.state;
    const nodes = (type === 'fence') ? FENCE_NODES : DRIVEWAYS_NODES;
    return nodes.map((id) => {
      const node = questions.filter(q => q['node_key'] === id);
      if (node && node[0]) {
        return this.renderQuestion(node[0], id);
      }
      return null;
    });
  }
  renderQuestion({content, title}, id) {
    return (
      <div className="qa-section__question" key={id}>
        <h6>{title}</h6>
        {/* eslint-disable-next-line */}
        <p dangerouslySetInnerHTML={{__html: content}} />
      </div>
    );
  }
  render() {
    const {isLoading} = this.state;
    return (
      <div className="qa-section">
        <h3 className="">Questions & Answers</h3>
        <PaneSwitcher defaultPane={getParameterByName('utm_content') === 'driveway' ? 1 : 0}>
          <div data-name="Fence 101">
            <div className="qa-section__questions-wrapper">
              {isLoading ? this.renderSpinner() : this.renderQuestions('fence')}
            </div>
            <Link to="/help/201900004">Read more →</Link>
          </div>
          <div data-name="Driveway 101">
            <div className="qa-section__questions-wrapper">
              {isLoading ? this.renderSpinner() : this.renderQuestions('driveways')}
            </div>
            <Link to="/help/201900003">Read more →</Link>
          </div>
        </PaneSwitcher>
      </div>
    );
  }
}
export default QASection;
