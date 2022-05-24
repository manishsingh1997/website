import {Button} from '@ergeon/core-components';
import React from 'react';
import {Link} from 'react-router-dom';
import {ReactSVG} from 'react-svg';
import somethingWrongIcon from '@ergeon/core-components/src/assets/icon-something-wrong@2x.svg';
import SingleCard from '../../common/SingleCard';

const UserError = () => {
  const content = (
    <div className="center">
      <div className="center spacing after__is-24">
        <ReactSVG className="icon-invalid-lock" src={somethingWrongIcon} />
      </div>
      <h4 className="center spacing after__is-12">Sorry, but something went wrong</h4>
      <div>Please try to reload the page or sign-in again.</div>
      <Link to="/app/sign-in">
        <Button className="spacing before__is-12" size="large" type="submit">
          Sign In
        </Button>
      </Link>
    </div>
  );
  return <SingleCard className="customer-app-anonymous-user" content={content} />;
};

export default UserError;
