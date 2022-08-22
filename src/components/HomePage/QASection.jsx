import React from 'react';

import {Link} from 'react-router-dom';
import {Spinner} from '@ergeon/core-components';

import {getNodes} from 'api/node';
import {parseAPIError} from 'utils/api.ts';

import './QASection.scss';

const FENCE_NODES = ['201900373', '202000553', '201900363', '201900318'];

class QASection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      questions: [],
      questionsExpanded: [],
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
  toggleQuestion(id) {
    const {questionsExpanded} = this.state;
    this.setState({
      questionsExpanded: [...questionsExpanded, id],
    });
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
  renderQuestion({ content, title }, id) {
    const {questionsExpanded} = this.state;
    const isExpanded = questionsExpanded.includes(id);
    const excerpt = content
      .split(/<p>(.*?)<\/p>/) // split on paragraphs
      .filter((p) => p !== '') // remove empty arrays
      .join(' ') // join arrays into a string
      .split(/\s/) // split on spaces
      .slice(0, 20) // take first 20 words
      .join(' ') // join words into a string with spaces
      .concat('...'); // add ellipsis
    return (
      <div className="qa-section__question" key={id}>
        <h3 className="h6">{title}</h3>
        {isExpanded
          ? <p dangerouslySetInnerHTML={{ __html: content }} />
          : <p>
            {excerpt}&nbsp;
            <span className="link" onClick={() => this.toggleQuestion(id)}>read more</span>
          </p>
        }
      </div>
    );
  }
  render() {
    const {isLoading} = this.state;
    return (
      <div className="qa-section">
        <h2 className="h3">Questions & Answers</h2>
        <div data-name="Fence 101">
          <div className="qa-section__questions-wrapper">
            {isLoading ? this.renderSpinner() : this.renderQuestions()}
          </div>
          <p>
            Read our FAQs&nbsp;
            <Link to="/help/201900004">here</Link>
          </p>
        </div>
      </div>
    );
  }
}
export default QASection;
