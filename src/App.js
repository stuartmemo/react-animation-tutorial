import React, { Component } from 'react';

class App extends Component {

    constructor (props) {
        super(props);

        this.getTodos = this.getTodos.bind(this);
        this.handleAddTodoChange = this.handleAddTodoChange.bind(this);
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

    getTodos () {
        return this.state.todos.map((todo, index) => {
            return (<li className="todo-list__item" key={index}>{todo}</li>);
        });
    }

    render() {
        return (
            <div className="container">
                <h1 className="todo-heading">To-dos</h1>
                <ul className="todo-list">
                    { this.getTodos() }
                </ul>
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
