import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { EqualHeight, EqualHeightElement } from 'react-equal-height';
import isEmpty from 'lodash/isEmpty';

import TellUsForm from '../../containers/TellUsForm';
import GetStartedSection from '../HomePage/components/GetStartedSection';
import UpcomingRemoteFeatures from '../HomePage/components/UpcomingRemoteFeatures';
import TestimonialBanner from '../HomePage/components/TestimonialBanner';
import QASection from '../HomePage/QASection';
import MainBanner from './MainBanner';
import CityReviews from './CityReviews';
import Regulations from './Regulations';
import { City } from './types';
import { getAsset } from './utils';

import './AppCityPage.scss';

export type AppCityPageProps = {
  city: City,
};

const AppCityPage = (props: AppCityPageProps) => {
  const { city } = props;

  const [loadPckgImage, setLoadPckgImage] = useState<string>();

  return (
    <>
      <Helmet>
        <title>{city.header.title} | Ergeon.com</title>
        <meta content={city.header.bullets.join(' ')} name="description" />
      </Helmet>
      <div className="AppCityPage">
        <MainBanner
          bullets={city.header.bullets}
          phone={city.phone}
          state={city.state}
          title={city.header.title}
        />

        <section className="wrapper-1180">
          <TestimonialBanner />
        </section>

        <CityReviews google={city.review.Google} yelp={city.review.Yelp} />

        <section className="wrapper-1180 RecentProjects">
          <h2 className="h3">Projects Recently Completed in {city.city}</h2>
          <div className="flex-wrapper RecentProjects-container">
            {city.projects.map((project, idx) => (
              <div className="flex-spacer RecentProjects-project" key={`project-${idx}`}>
                <a href={project.url}>
                  <img alt={project.label} src={getAsset(project.img, 'jpeg')} />
                </a>
                <div className="RecentProjects-projectCaption">
                  <a href={project.url}>
                    <span>{project.label}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mobile-length">
          <TellUsForm />
        </section>

        <section className="wrapper-1180 Packages">
          <h2 className="h3 spacing after__is-6">{city.packages.title}</h2>
          <p className="spacing after__is-30">{city.packages.description}</p>
          {[
            { data: city.packages.data.wood, title: 'Wood Fences' },
            { data: city.packages.data.vinyl, title: 'Vinyl Fences' },
            { data: city.packages.data['chain-link'], title: 'Chainlink Fences' },
            { data: city.packages.data['box-wire'], title: 'Box Wire' },
          ]
            .filter(({ data }) => !isEmpty(data))
            .map(({ data, title }) => (
              <section key={title}>
                <h3 className="h4 spacing after__is-12">{title}</h3>
                <section className="cards four-columns Packages-container">
                  <EqualHeight animationSpeed={0} updateOnChange={loadPckgImage}>
                    {data?.map(pckg => (
                      <EqualHeightElement key={pckg.title} name={title}>
                        <div className="card padding-60 soft-border shadow__z0 Packages-item">
                          <img onLoad={() => setLoadPckgImage(pckg.img)} src={getAsset(pckg.img, 'jpeg')} />
                          <p className="h5 Packages-title">{pckg.title}</p>
                          <p className="Packages-description">{pckg.description}</p>
                        </div>
                      </EqualHeightElement>
                    ))}
                  </EqualHeight>
                </section>
              </section>
            ))}
        </section>

        <Regulations
          city={city.city}
          faq={city.regulations.faq}
          img={city.regulations.img}
          pdf={city.regulations.pdf}
          url={city.regulations.url} />

        <section>
          <UpcomingRemoteFeatures />
        </section>

        <section className="wrapper-1180">
          <GetStartedSection />
        </section>

        <section className="wrapper-1180">
          <QASection />
        </section>

        <section className="wrapper-1180 CityBlog">
          <h2 className="h3">From our Blog</h2>
          <div className="cards CityBlog-container">
            <EqualHeight animationSpeed={0} updateOnChange={loadPckgImage}>
              {city.blog.articles.map(article => (
                <EqualHeightElement key={article.url} name="Blog">
                  <a className="card padding-60 soft-border shadow__z0 CityBlog-article" href={article.url}>
                    <div
                      className="CityBlog-img"
                      style={{ backgroundImage: `url(${getAsset(article.img, 'jpeg')})` }} />
                    <div className="CityBlog-content">
                      <p>{article.description}</p>
                      <span className="CityBlog-link">View more</span>
                    </div>
                  </a>
                </EqualHeightElement>
              ))}
            </EqualHeight>
          </div>
        </section>

        <section className="mobile-length">
          <TellUsForm />
        </section>
      </div>
    </>
  );
};

export default AppCityPage;
