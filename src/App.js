import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Motion, spring } from 'react-motion';

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
                    text: 'Go to post office'
                },
                {
                    id: uuid(),
                    text: 'Think about life'
                },
                {
                    id: uuid(),
                    text: 'Lie down'
                }
            ],
            mounted: false
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
        this[id].style.transitionDelay = '1000ms';

        let newItems = this.state.todos.filter((todo) => {
            return todo.id !== id;
        })

        this.setState({
            todos: newItems
        });
    }

    getTodos () {
        return this.state.todos.map((todo, index) => {
            let itemStyle = {
                transitionDelay: (200 * index) + 'ms'
            };

            return (
                <li className="todo-list__item" style={itemStyle} key={todo.id} ref={item => { this[todo.id] = item }}>
                    <span>{todo.text}</span>
                     <Motion defaultStyle={{width: 18, height: 18}} style={ todo.completed ? {width: spring(0), height: spring(0)}:null}>
                        {interpolatingStyle  => (
                            <button
                                className="todo-list__checkbox"
                                style={interpolatingStyle}
                                onClick={ () => this.handleRemove(todo.id, todo) }
                            ></button>
                        )}
                    </Motion>
                </li>
            );
        });
    }

    render() {
        let todos;

        if (this.state.mounted) {
            todos = this.getTodos();
        }

        return (
            <div className="container">
                <h1 className="todo-heading">To-dos</h1>
                <ReactCSSTransitionGroup
                    component="ul"
                    className="todo-list"
                    transitionName="new-todo"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    { todos }
                </ReactCSSTransitionGroup>
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

    componentDidMount () {
        this.setState({ mounted: true });
    }
}

export default App;
