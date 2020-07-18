import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './app.css'
import Scroll from '../components/Scroll';
import ErrorBoundary from "../components/ErrorBoundary";

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            robots : [],
            searchField : ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((users) => this.setState({robots: users}))
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value })
    }

    render() {
        const { robots, searchField } = this.state;
        const filteredRobots = robots.filter((robot) => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })

        if(!robots.length){
            return <h1>LOADING...</h1>
        }
        else{
            return (
                <div className="tc">
                    <h1>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;