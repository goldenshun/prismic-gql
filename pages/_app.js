import React from 'react';
import _compose from 'lodash/fp/compose';
import App from 'next/app';
import Head from 'next/head';
import withApollo from 'next-with-apollo';
import { ApolloProvider } from '@apollo/react-hooks';
import initApollo from '../lib/apollo-client/initApollo';


class NextApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const {
      Component, pageProps, apollo, ...other
    } = this.props;
    return (
      <>
        <Head>
          <script async defer src="//static.cdn.prismic.io/prismic.js?repo=sean-prismic-demo&new=true" />
        </Head>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} {...other} />
        </ApolloProvider>
      </>
    );
  }
}

export default _compose(
  withApollo(initApollo),
)(NextApp);
