import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends Component {

    constructor (props) {
        super(props);

        this.getTodos = this.getTodos.bind(this);
        this.handleAddTodoChange = this.handleAddTodoChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            newTodo: '',
            todos: []
        };
    }

    handleSubmit (e) {
        e.preventDefault();

        let todos = this.state.todos,
            newTodo = this.state.newTodo;

        todos.push(newTodo);

        this.setState({
            newTodo: '',
            todos: todos
        });
    }

    handleAddTodoChange (e) {
        this.setState({ newTodo: e.target.value })
    }

    handleRemove (index) {
        let newItems = this.state.todos.slice();
        newItems.splice(index, 1);
        this.setState({ todos: newItems });
    }

    getTodos () {
        return this.state.todos.map((todo, index) => {
            return (
                <li className="todo-list__item" key={todo}>
                    <span>{todo}</span>
                    <input
                        className="todo-list__checkbox"
                        onChange={ () => this.handleRemove(index) }
                        type="checkbox"
                    />
                </li>
            );
        });
    }

    render() {
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
                    { this.getTodos() }
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
}

export default App;
