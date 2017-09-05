import React, { Component } from 'react'
import 'font-awesome/css/font-awesome.css'
import moment from 'moment'
import 'moment-duration-format'
import CopyToClipboard from 'react-copy-to-clipboard'

import './App.css'

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      elapsed: 0,
      startedAt: moment(),
      resumedAt: moment()
    }

    this.ticking = false
    this.totalElapsed = 0

    this.handleStart = this.handleStart.bind(this)
    this.tick = this.tick.bind(this)
    this.timer = setInterval(this.tick, 50)
  }

  handleStart () {
    if (!this.startedAt && this.ticking === false) {
      this.ticking = true
      this.setState({
        startedAt: moment(),
        resumedAt: moment()
      })
    } else if (this.ticking) {
      this.totalElapsed += new Date().getTime() - parseInt(this.state.resumedAt.format('x'))
      this.ticking = false
    } else {
      this.state.resumedAt = new Date()
      this.ticking = true
    }
  }

  tick () {
    const elapsed = this.totalElapsed +
      this.ticking && new Date().getTime() -
      parseInt(this.state.resumedAt.format('x'))

    this.setState({ elapsed })

    if (!this.startedAt) {
      this.setState({ startedAt: moment() })
    }
  }

  render () {
    return <div id='clock'>
      <p className='date'>
        {this.state.startedAt.format('LLL')}
        <CopyToClipboard text={this.state.startedAt.format('DD/MMM/YY hh:mm A')}>
          <button className='no-border'><i className='fa fa-paste' /></button>
        </CopyToClipboard>
      </p>
      <p className='time'>
        {moment.duration(this.state.elapsed).format('d h:m:s')}
        <CopyToClipboard text={moment.duration(this.state.elapsed).format('d[d] h[h] m[m]')}>
          <button className='no-border'><i className='fa fa-paste' /></button>
        </CopyToClipboard>
      </p>
      <p className='text'>
        <button onClick={this.handleStart}>
          {
            this.ticking
            ? <span><i className='fa fa-pause' /> Pause</span>
            : <span><i className='fa fa-play' /> Play</span>
          }
        </button>
      </p>
    </div>
  }
}