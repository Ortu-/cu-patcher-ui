/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';

export interface NewsProps {};

export interface NewsState {};

class News extends React.Component<NewsProps, NewsState> {
  public name: string = 'cse-patcher-news';
  
  constructor(props: NewsProps) {
    super(props);
  }
  
  render() {
    return (
      
    );
  }
};

export default News;
