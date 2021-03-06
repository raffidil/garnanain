/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import {
  Card,
  Chip,
  ChipContact,
} from 'react-mdl';
import cx from 'classnames';
import db from 'localforage';
import Header from './Header';
import s from './Layout.css';
import mainPic from './main.jpg';
import teams from '../../src/teams';
import mira from './Mira.ogg';

class Layout extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  constructor() {
    super();
    this.state = { scores: [] };
  }

  componentWillMount() {
    this.updateScores();
  }

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  addScore = (n) => {
    const scores = this.state.scores;
    const audio = new Audio(mira);
    audio.play();
    scores[n] = (scores[n] || 0) + 5;
    this.setState({ scores });
    db.setItem('scores', this.state.scores).catch(console.log);
  }

  updateScores = () => {
    db.getItem('scores').then((scores) => {
      if (scores != null) {
        this.setState({ scores });
      }
    });
  }

  render() {
    return (
      <div className="mdl-layout mdl-js-layout" ref={node => (this.root = node)}>
        <div className="mdl-layout__inner-container">
          <Header />
          <main style={{ background: `url(${mainPic}) center / cover` }} className="mdl-layout__content">
            <Card shadow={3} className={s.scoreBoard}>
              <div style={{width: '100%', marginTop: '4px', marginBottom: '4px'}}>

                {teams.map(team => (
                   <Chip
                     key={team.id}
                     onClick={() => this.addScore(team.id)}
                     style={{ backgroundColor: team.color, marginLeft: '10px' }}
                   >
                     <ChipContact
                       className="mdl-color mdl-color-text--white"
                       style={{ backgroundColor: team.backColor}}
                     >
                       {this.state.scores[team.id]}
                     </ChipContact>
                     <div style={{fontSize: '21px', fontFamily: 'ArTarumianMatenagir'}}>{team.name}</div>
                   </Chip>
                 ))}

              </div>
            </Card>
            <div {...this.props} className={cx(s.content, this.props.className)} />
          </main>
        </div>
      </div>
    );
  }
}

export default Layout;
