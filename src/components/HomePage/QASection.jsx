import React from 'react';
import {Link} from 'react-router-dom';
import {Spinner} from '@ergeon/core-components';
import {getNodes} from 'api/node';
import {parseAPIError} from 'utils/api.ts';
import PaneSwitcher from './components/PaneSwitcher';
import './QASection.scss';

const FENCE_NODES = ['201900373', '202000553', '201900363', '201900318'];

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
    const NODES = [...FENCE_NODES];
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
        <Spinner active={isLoading} borderWidth={0.1} color="blue" size={64} />
      </div>
    );
  }
  renderQuestions() {
    const {questions = []} = this.state;
    const nodes = FENCE_NODES;
    return nodes.map((id) => {
      const node = questions.filter((q) => q['node_key'] === id);
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
        <PaneSwitcher defaultPane={0}>
          <div data-name="Fence 101">
            <div className="qa-section__questions-wrapper">
              {isLoading ? this.renderSpinner() : this.renderQuestions()}
            </div>
            <Link to="/help/201900004">Read more →</Link>
          </div>
        </PaneSwitcher>
      </div>
    );
  }
}
export default QASection;
