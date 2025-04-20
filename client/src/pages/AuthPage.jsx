import React from 'react';
import AuthContainer from '../components/auth/AuthContainer';
import Layout from '../components/Layout';

const AuthPage = () => {
  return (
    <Layout hideNav>
      <div className="auth-page">
        <AuthContainer />
      </div>
    </Layout>
  );
};

export default AuthPage;