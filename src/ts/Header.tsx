/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';

import {Routes} from './redux/modules/locations';

export interface HeaderProps {
  changeRoute: (route: Routes) => void;
  openChat: () => void;
  activeRoute: Routes;
};

export interface HeaderState {};

class Header extends React.Component<HeaderProps, HeaderState> {
  public name = 'cse-patcher-header';
  
  static propTypes = {
    changeRoute: React.PropTypes.func.isRequired,
    openChat: React.PropTypes.func.isRequired,
    activeRoute: React.PropTypes.number.isRequired
  }

  externalLink = (url: string) => {
    window.open(url, '_blank');
  }
  
  internalLink = (route: Routes) => {
    this.props.changeRoute(route);
  }

  render() {
    return (
      <div id={this.name} className='navbar-fixed'>
        <nav>
        <div className='nav-wrapper'>
          <a className='brand-logo cu-logo' onClick={this.internalLink.bind(this, Routes.HERO)}><img src='images/cu-logo-white.png' /></a>
          <ul id='nav-mobile' className='right'>
            <li className={this.props.activeRoute == Routes.NEWS ? 'active' : ''}><a onClick={this.internalLink.bind(this, Routes.NEWS)}>News</a></li>
            <li><a onClick={this.externalLink.bind(this, 'http://camelotunchained.com/v2/')} className='external-link'>Getting Started</a></li>
            <li><a onClick={this.externalLink.bind(this, 'http://camelotunchained.com/v2/')}>CSE Store</a></li>
            <li><a onClick={this.props.openChat}>Chat</a></li>
          </ul>
        </div>
        </nav>
      </div>
    );
  }
};

// PATCH NOTES DISABLED -- paste into unordered list to re-enable
// <li className={this.props.activeRoute == Routes.PATCHNOTES ? 'active' : ''}><a onClick={this.internalLink.bind(this, Routes.PATCHNOTES)}>Patch Notes</a></li>
// <li className={this.props.activeRoute == Routes.SUPPORT ? 'active' : ''}><a onClick={this.internalLink.bind(this, Routes.SUPPORT)}>Support</a></li>

export default Header;