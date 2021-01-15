import React from 'react';
import {
  Route as BaseRoute,
  Switch as BaseSwitch,
  Link as BaseLink,
  NavLink as BaseNavLink,
  withRouter
} from 'react-router-dom';
import { withProps, mapProps, branch, compose } from 'recompose';

const withoutProps = (...dropped) => mapProps(
  props => dropped.reduce(
    (acc, prop) => {
      const {[prop]: dummy, ...rest} = acc;
      return rest;
    }, props)
);

const normalizeUrl = url => (url === '/' ? '' : url);
const toAbsoluteUrl = (url, path) => `${normalizeUrl(url)}${path}`

const whenRelative = fn => branch(
  ({relative}) => !! relative,
  fn
)

const toAbsolutePath = withProps(({match: {url}, path = '', relative}) =>
    ({path: toAbsoluteUrl(url, path)}));

const toAbsoluteTarget = withProps(({match: {url}, to = ''}) => ({
  to: (
    (typeof to === 'object') ?
      {...to, pathname: toAbsoluteUrl(url, to.pathname)} :
      toAbsoluteUrl(url, to)
  )
}));

const Route = compose(
  withRouter,
  whenRelative(toAbsolutePath),
  withoutProps('relative')
)(BaseRoute);

const fromRelativeLink = compose(
  withRouter,
  whenRelative(toAbsoluteTarget),
  withoutProps('staticContext', 'relative')
);
const Link = fromRelativeLink(BaseLink);
const NavLink = fromRelativeLink(BaseNavLink);

const Switch = compose(
  withRouter,
  withProps(
    ({children, match: {url}}) => (
      {
        children: React.Children.map(children, child => {
          if(child.props.relative) {
            return React.cloneElement(
              child,
              {path: `${normalizeUrl(url)}${child.props.path}`, relative: false}
            );
          }
          return child;
        })
      }
    )
  )
)(BaseSwitch);

export {Route, Switch, Link, NavLink};