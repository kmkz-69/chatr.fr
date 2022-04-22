import React, { ChangeEvent, Component } from 'react'
import styles from './Input.module.scss'

interface InputProps {
  name: string
  type: string
  value: string
  placeholder: string
  handleChange: (event: ChangeEvent) => void
}

export default class Input extends Component<InputProps> {
  render () {
    return (
      <input
        className={styles.input}
        name={this.props.name}
        type={this.props.type}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.props.handleChange}
        autoComplete="off" />
    )
  }
}
