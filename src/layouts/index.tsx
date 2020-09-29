import React, { createContext, useReducer } from 'react';
import Main from '@/layouts/Main';
import Full from '@/layouts/Full';

import { Helmet } from 'react-helmet';
import Page404 from '@/pages/Error/404';
import { Provider } from 'react-redux';
import { store } from '@/plugins/store/store';

const index = (props: any) => {
  const urlInfo: any = {};

  props.route.routes.map((item: any) => {
    urlInfo[item.path] = {
      ...item.pageParams,
    };
  });

  if (urlInfo[props.location.pathname]) {
    const urlParams = urlInfo[props.location.pathname];

    const PageHeader = (props: any) => {
      return (
        <div>
          <Provider store={store}>
            <Helmet>
              <title>iExams - {urlParams.title}</title>
            </Helmet>
            {props.children}
          </Provider>
        </div>
      );
    };

    if (urlParams.isFullPage) {
      return (
        <PageHeader>
          <Full {...urlParams} {...props} />
        </PageHeader>
      );
    }
    return (
      <PageHeader>
        <Main {...urlParams} {...props} />
      </PageHeader>
    );
  } else {
    return <Page404 />;
  }
};

index.wrappers = ['@/plugins/auth/tokenAuth'];

export default index;
