import React, {useCallback, useEffect, useRef, useState} from 'react';

import {Helmet} from 'react-helmet';
import {EqualHeight, EqualHeightElement} from 'react-equal-height';
import isEmpty from 'lodash/isEmpty';

import TellUsForm from '../../containers/TellUsForm';
import GetStartedSection from '../HomePage/components/GetStartedSection';
import UpcomingRemoteFeatures from '../HomePage/components/UpcomingRemoteFeatures';
import TestimonialBanner from '../HomePage/components/TestimonialBanner';
import QASection from '../HomePage/QASection';
import {initSmartLook} from '../AppLayout/utils';

import CityReviews from './CityReviews';
import Regulations from './Regulations';
import ProjectsCompleted from './ProjectsCompleted';
import {City} from './types';
import {getAsset} from './utils';
import CityBanner from './CityBanner';
import LicensesAndWarranty from './LicensesAndWarranty';

import './AppCityPage.scss';

export type AppCityPageProps = {
  city: City;
};

const AppCityPage = (props: AppCityPageProps) => {
  const {city} = props;

  const [loadPckgImage, setLoadPckgImage] = useState<string>();

  const licenseSectionRef = useRef<HTMLDivElement>(null);

  const onScrollToLicense = useCallback(() => {
    licenseSectionRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'});
  }, [licenseSectionRef]);

  useEffect(() => {
    initSmartLook();
  }, []);

  return (
    <>
      <Helmet>
        <title>{city.header.title} | Ergeon.com</title>
        <meta content={city.header.bullets.join(' ')} name="description" />
        <link href={`${process.env.HOME_PAGE}/fences/cities/${city.slug}`} rel="canonical" />
      </Helmet>
      <div className="AppCityPage">
        <CityBanner city={city.city} onScrollToLicense={onScrollToLicense} phone={city.phone} />

        <section className="wrapper-1180">
          <TestimonialBanner />
        </section>

        <CityReviews google={city.review?.Google} yelp={city.review?.Yelp} />

        <ProjectsCompleted city={city.city} projects={city.projects} />

        <section className="tablet-length">
          <TellUsForm />
        </section>

        <section className="wrapper-1180 Packages">
          <h2 className="h3 spacing after__is-6">{city.packages.title}</h2>
          <p className="spacing after__is-30">{city.packages.description}</p>
          {[
            {data: city.packages.data.wood, title: 'Wood Fences'},
            {data: city.packages.data.vinyl, title: 'Vinyl Fences'},
            {data: city.packages.data['chain-link'], title: 'Chainlink Fences'},
            {data: city.packages.data['box-wire'], title: 'Box Wire'},
          ]
            .filter(({data}) => !isEmpty(data))
            .map(({data, title}) => (
              <section key={title}>
                <h3 className="h4 spacing after__is-12">{title}</h3>
                <section className="cards four-columns Packages-container">
                  <EqualHeight animationSpeed={0} updateOnChange={loadPckgImage}>
                    {data?.map((pckg) => (
                      <EqualHeightElement key={pckg.title} name={title}>
                        <div className="card Packages-item-padding soft-border shadow__z0 Packages-item">
                          <img
                            data-testid="test-image"
                            onLoad={() => setLoadPckgImage(pckg.img)}
                            src={getAsset(pckg.img, 'jpeg')}
                          />
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
          url={city.regulations.url}
        />

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
              {city.blog.articles.map((article) => (
                <EqualHeightElement key={article.url} name="Blog">
                  <a className="card soft-border shadow__z0 CityBlog-article" href={article.url}>
                    <div className="CityBlog-img" style={{backgroundImage: `url(${getAsset(article.img, 'jpeg')})`}} />
                    <div className="CityBlog-content">
                      <p>{article.description}</p>
                    </div>
                    <span className="CityBlog-link">View more</span>
                  </a>
                </EqualHeightElement>
              ))}
            </EqualHeight>
          </div>
        </section>

        <section className="wrapper-1180" ref={licenseSectionRef}>
          <LicensesAndWarranty cityItem={city} />
        </section>

        <section className="mobile-length">
          <TellUsForm />
        </section>
      </div>
    </>
  );
};

export default AppCityPage;
