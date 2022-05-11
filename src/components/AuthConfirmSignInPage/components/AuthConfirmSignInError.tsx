import React, {PropsWithChildren} from 'react';

type AuthConfirmSignInErrorProps = PropsWithChildren<{
  icon: string,
  desc?: string,
  title: string,
}>;

export const AuthConfirmSignInError = (props: AuthConfirmSignInErrorProps) => {
  const {desc, children, icon, title} = props;

  return (
    <div className="center">
      <div className="center spacing after__is-24">
        <img className="icon-invalid-lock" src={icon} />
      </div>
      <p className="h4 center spacing after__is-12">{title}</p>
      <p>{desc}</p>
      {children}
    </div>
  );
};

export default AuthConfirmSignInError;
