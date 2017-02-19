import React, { Component } from 'react';

export default class TodoItem extends Component {
    render () {
        return (<li className="todo-list__item">{this.props.todo}</li>);
    }
}
