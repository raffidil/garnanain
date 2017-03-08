import React from 'react';
import {
  Button,
  CardText,
  Card,
  CardTitle,
  CardMenu,
  CardActions,
  IconButton,
  Grid,
  Icon,
  FABButton,
  Cell,
  ProgressBar,
  IconToggle,
  Tooltip
} from 'react-mdl';
import db from 'localforage';
import Layout from '../../components/Layout';
import s from './styles.css';
import Link from '../../components/Link';
import history from '../history';
import Timer from '../../components/Timer';
import QButton from '../../components/QButton';

class AboutPage extends React.Component {
  constructor() {
    super();
    this.state = { seen: [] };
  }

  componentDidMount() {
    document.title = 'Նկարներ';
    db.getItem('images').then((state) => {
      this.setState(state);
    }).catch((err) => {
      console.log(err);
    })
  }
  gotoCategories() {
    history.push({ pathname: '/categories'}); // go to page function
  }
  makeSeen = (number) => {
    const seen = this.state.seen;
    seen[number] = true;
    this.setState({ seen });

    db.setItem('images', this.state)
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <Layout className={s.content}>
        <h1 className={s.fontstyle1} style={{
          marginTop: '20px'
        }}><Grid className="demo-grid-1" style={{
          marginTop: '20px'
        }}>
          <Cell col={1}>
            <IconButton name="arrow_back" colored onClick={this.gotoCategories}/>
          </Cell>
          <Cell col={1}>Նկարներ</Cell>
            </Grid>
       </h1>
        <div style={{
          width: '100%',
          fontSize: '30px'
        }}>
        <Grid className="demo-grid-1" style={{
          marginTop: '10px'
        }}>
          <Cell col={2}>
            <QButton text="1" onClick={() => this.makeSeen(1)} goto="/P1" seen={this.state.seen[1]}/>
          </Cell>
          <Cell col={2}>
            <QButton text="2" onClick={() => this.makeSeen(2)} goto="/P2" seen={this.state.seen[2]}/>
          </Cell>
          <Cell col={2}>
            <QButton text="3" onClick={() => this.makeSeen(3)} goto="/P3" seen={this.state.seen[3]}/>
          </Cell>
          <Cell col={2}>
            <QButton text="4" onClick={() => this.makeSeen(4)} goto="/P4" seen={this.state.seen[4]}/>
          </Cell>
          <Cell col={2}>
            <QButton text="5" onClick={() => this.makeSeen(5)} goto="/P5" seen={this.state.seen[5]}/>
          </Cell>
        </Grid>
        <Grid className="demo-grid-1" style={{
          marginTop: '25px'
        }}>
        <Cell col={2}>
            <QButton text="6" onClick={() => this.makeSeen(6)} goto="/P6" seen={this.state.seen[6]}/>
        </Cell>
          <Cell col={2}>
            <QButton text="7" onClick={() => this.makeSeen(7)} goto="/P7" seen={this.state.seen[7]}/>
          </Cell>
          <Cell col={2}>
            <QButton text="8" onClick={() => this.makeSeen(8)} goto="/P8" seen={this.state.seen[8]}/>
          </Cell>
          <Cell col={2}>
            <QButton text="9" onClick={() => this.makeSeen(9)} goto="/P9" seen={this.state.seen[9]}/>
          </Cell>
          <Cell col={2}>
            <QButton text="10" onClick={() => this.makeSeen(10)} goto="/P10" seen={this.state.seen[10]}/>
          </Cell></Grid>
        <Timer timeout={60}/>
        </div>
      </Layout>
    );
  }

}

export default AboutPage;