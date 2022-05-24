import {Button} from '@ergeon/core-components';
import React from 'react';
import {Link} from 'react-router-dom';
import SingleCard from '../../common/SingleCard';

const AnonymousUser = () => {
  const content = (
    <div className="center">
      <h4 className="spacing after__is-12">Not signed in</h4>
      <p className="spacing after__is-24">Please sign in first to access the app</p>
      <Link to="/app/sign-in">
        <Button className="spacing before__is-12" size="large" type="submit">
          Sign In
        </Button>
      </Link>
    </div>
  );
  return <SingleCard className="customer-app-anonymous-user" content={content} />;
};

export default AnonymousUser;
