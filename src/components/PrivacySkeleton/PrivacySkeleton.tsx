import React, { Component, Fragment } from 'react'
import { random, range } from 'lodash'
import Skeleton from '../Skeleton/Skeleton'

interface PrivacySkeletonProps {
  visibility: boolean
}

export default class PrivacySkeleton extends Component<PrivacySkeletonProps> {
  get heading () {
    return (
      <Skeleton
        width={this.randomWidth(30, 40)}
        height="18px"
        marginBottom="25px"
        marginTop="25px" />
    )
  }

  randomWidth (minWidth: number, maxWidth: number) {
    return `${random(minWidth, maxWidth)}%`
  }

  paragraph (lines: number) {
    return (
      range(lines).map(line =>
        <Skeleton
          width={this.randomWidth(80, 100)}
          height="11px"
          marginBottom="5px"
          key={line} />
      )
    )
  }

  render () {
    return this.props.visibility &&
      <Fragment>
        <div>{this.paragraph(3)}</div>
        {this.heading}
        <div>{this.paragraph(5)}</div>
      </Fragment>
  }
}
