import { transitions } from 'polished';
import { FunctionComponent, HTMLAttributes } from 'react';
import { useMediaQuery } from 'react-responsive';
import { animated, config, useSpring } from 'react-spring';

import { Avatar } from '@terenceodonoghue/react-components/velocity';

import { DESKTOP } from '../../utils/breakpoints';
import Item, { ItemProps } from './Item';

interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  anchor?: 'left' | 'right';
  avatar: string;
  name: string;
  open?: boolean;
}

interface DrawerComposition {
  Item: FunctionComponent<ItemProps>;
}

const Drawer: FunctionComponent<DrawerProps> & DrawerComposition = ({
  anchor = 'left',
  avatar,
  children,
  name,
  open = false,
  ...props
}) => {
  const isTabletOrMobile = useMediaQuery({
    maxWidth: DESKTOP - 1,
  });

  const closedWidth = isTabletOrMobile ? 0 : 80;

  const { width } = useSpring({
    config: config.stiff,
    width: open ? 215 : closedWidth,
  });

  return (
    <animated.div
      css={[
        ({ color }) => ({
          backgroundColor: color.neutral[50],
          bottom: 0,
          overflowX: 'hidden',
          padding: '20px 0',
          position: 'fixed',
          top: 79,
          zIndex: 1200,
        }),
        anchor === 'left' ? { left: 0 } : { right: 0 },
      ]}
      data-testid="drawer"
      style={{ width }}
      {...props}
    >
      <div
        css={[
          ({ transition }) => ({
            display: 'flex',
            alignItems: 'center',
            margin: '27px 0 34px',
            opacity: open ? 1 : 0,
            paddingLeft: 28,
            ...transitions(['opacity'], transition.quickly),
          }),
        ]}
      >
        <Avatar
          alt={name}
          css={{
            marginRight: 8,
          }}
          size={32}
          src={avatar}
          variant="square"
        />
        <div>
          <span>Welcome</span>
          <span
            css={({ color }) => ({
              color: color.neutral[400],
              display: 'block',
              whiteSpace: 'nowrap',
            })}
          >
            {name}
          </span>
        </div>
      </div>
      <nav>
        <ul
          css={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {children}
        </ul>
      </nav>
    </animated.div>
  );
};

Drawer.Item = Item;

export default Drawer;
