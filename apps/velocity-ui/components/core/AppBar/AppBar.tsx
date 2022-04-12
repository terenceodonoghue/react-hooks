import React, { FunctionComponent } from 'react';

const AppBar: FunctionComponent = (props) => (
  <div
    css={({ palette, zIndex }) => ({
      alignItems: 'center',
      backgroundColor: palette.neutral[50],
      borderBottom: `solid 1px ${palette.neutral[300]}`,
      display: 'flex',
      minHeight: 80,
      padding: '0 25px',
      position: 'sticky',
      top: 0,
      zIndex: zIndex.appBar,
    })}
    data-testid="app-bar"
    {...props}
  />
);

export default AppBar;
