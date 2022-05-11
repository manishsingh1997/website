import React, {useMemo} from 'react';
import {Accordion} from '@ergeon/core-components';

type Question = {
  question: string;
  answer: JSX.Element;
}

type FAQQuestionProps = {
  title: string;
  questions: Question[];
};

const FAQQuestion = ({title, questions}: FAQQuestionProps) => {
  const accordionItems = useMemo(() => {
    return questions.map(({question, answer}) => ({title: question, content: answer}));
  }, [questions]);

  return (
    <div className="faq-page__group">
      <h3 className="spacing before__is-30 after__is-24">{title}</h3>
      <div className="faq-page__group-questions">
        <Accordion items={accordionItems} />
      </div>
    </div>
  );
};

export default FAQQuestion;
