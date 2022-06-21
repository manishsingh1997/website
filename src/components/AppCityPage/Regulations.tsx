import React, { useState, useMemo, useCallback } from 'react';
import { Collapsible } from '@ergeon/core-components';

import RegulationsImg from '../../assets/regulations.jpeg';

import { getAsset } from './utils';
import { City } from './types';

import './Regulations.scss';

type RegulationsProps = {
  city: City['city'],
  faq: City['regulations']['faq'],
  img: City['regulations']['img'],
  pdf: City['regulations']['pdf'],
  url: City['regulations']['url'],
}

const Regulations = (props: RegulationsProps) => {
  const { city, faq, img, pdf, url } = props;

  // used to toggle regulation items on mobile view only
  const [isItemOpen, setIsItemOpen] = useState<boolean[]>([]);

  const faqItems = useMemo(() => {
    const titlesArray = [
      'What height of the fence can I put up in my front yard?',
      'How high can a side fence be?',
      'What is the maximum height of a backyard fence?',
      'How close to the property line can I build a fence?',
      'What is the maximum height of a fence if my property is located on a corner lot?',
    ]
    return Object.values(faq).map((val, idx) => ({
      title: titlesArray[idx],
      content: val,
    }));
  }, [faq]);

  const desktopView = useMemo(() => {
    return (
      <div className="desktop-length">
        <ul className="unordered spacing after__is-24">
          {faqItems.map(({ title, content }, idx) => (
            <li className="spacing after__is-12" key={`faq-${idx}`}>
              <b>{title}</b> <br />
              {content}
            </li>
          ))}
        </ul>
      </div>
    )
  }, [])

  const mobileView = useMemo(() => {
    return (
      <div className="mobile-length Regulations-mobile">
        {faqItems.map(({ title, content }, idx) => (
          <div className="Regulation-item" key={`faq-${idx}`}>
            <Collapsible
              isOpen={isItemOpen[idx]}
              onChangeOpen={() => toggleOpen(idx)}
              title={title}>
              {content}
            </Collapsible>
          </div>
        ))}
      </div>
    )
  }, [faqItems, isItemOpen]);

  const toggleOpen = useCallback((idx: number) => {
    setIsItemOpen((prev) => {
      const newIsOpen = [...prev];
      newIsOpen[idx] = !newIsOpen[idx];
      return newIsOpen;
    });
  }, [isItemOpen]);

  return (
    <section className="wrapper-1180 Regulations">
      <h2 className="h3 spacing after__is-30">{city} Permits & Regulations</h2>
      <div className="flex-wrapper Regulations-container">
        <div className="flex-spacer Regulations-row">
          {desktopView}
          {mobileView}
          {url &&
            <p>Learn more about <a href={getAsset(url, 'pdf')} target="__blank">
              {city} – City Regulations</a>.
            </p>
          }
        </div>
        <div className="flex-spacer Regulations-row desktop-length">
          {pdf &&
            <a href={getAsset(pdf, 'pdf')} target="__blank">
              {img && <img src={getAsset(img, 'jpeg')} />}
              {!img && <img src={RegulationsImg} />}
            </a>
          }
          {!pdf && <img src={RegulationsImg} />}
        </div>
      </div>
    </section>
  )
};

export default Regulations;
