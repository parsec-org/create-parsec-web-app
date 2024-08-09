import React from 'react';
import { ConfigProvider } from 'antd';

const withTheme = (node: JSX.Element) => (
  <ConfigProvider
    prefixCls="parsec"
    iconPrefixCls="parsec-icon"
    theme={{
      token: {
        colorPrimary: '#348ec5',
        fontFamily: 'Labil-Regular',
        fontSize: 14,
        colorLink: '#141414',
      },
      components: {},
    }}
  >
    <ConfigProvider>{node}</ConfigProvider>
  </ConfigProvider>
);

export default withTheme;
