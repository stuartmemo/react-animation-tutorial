import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Motion, spring, presets } from 'react-motion';

const uuid = require('uuid/v4');

class App extends Component {

    constructor (props) {
        super(props);

        this.getTodos = this.getTodos.bind(this);
        this.handleAddTodoChange = this.handleAddTodoChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            newTodo: '',
            todos: [
                {
                    id: uuid(),
                    text: 'Buy milk',
                },
                {
                    id: uuid(),
                    text: 'Return library book'
                },
                {
                    id: uuid(),
                    text: 'Think about life'
                }
            ],
            shouldMoveInput: false
        };
    }

    handleSubmit (e) {
        e.preventDefault();

        let todos = this.state.todos,
            newTodo = {
                id: uuid(),
                text: this.state.newTodo
            };

        todos.push(newTodo);

        this.setState({
            newTodo: '',
            todos: todos
        });
    }

    handleAddTodoChange (e) {
        this.setState({ newTodo: e.target.value })
    }

    handleRemove (id) {
        let newTodos = this.state.todos.filter((todo) => {
            return todo.id !== id;
        })

        this.setState({todos: newTodos });
    }

    getTodos () {
        return this.state.todos.map((todo, index) => {
            return (
                <Motion defaultStyle={{left: -1000}} style={{left: spring(0, presets.gentle)}} key={todo.id}>
                    {interpolatingStyle => (
                        <li
                            className="todo-list__item"
                            key={todo.id}
                            ref={item => { this[todo.id] = item }}
                            style={interpolatingStyle}
                        >
                            <span>{todo.text}</span>
                            <input
                                className="todo-list__checkbox"
                                onChange={ () => this.handleRemove(todo.id) }
                                type="checkbox"
                            />
                        </li>
                    )}
                </Motion>
            );
        });
    }

    render() {
        let todos = this.getTodos();

        return (
            <div className="container">
                <h1 className="todo-heading">To-dos</h1>
                <CSSTransitionGroup
                    component="ul"
                    className="todo-list"
                    transitionName="new-todo"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    { todos }
                </CSSTransitionGroup>
                <div className="todo-controls">
                    <form onSubmit={this.handleSubmit}>
                        <input
                            className="todo-controls__input"
                            onChange={this.handleAddTodoChange}
                            placeholder="Add a todo"
                            type="text"
                            value={this.state.newTodo}
                        />
                        <button className="todo-controls__button">Add</button>
                    </form>
                </div>
            </div>
        );
    }

}

export default App;
