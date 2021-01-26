import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [], //Set initial value to empty array
            searchfield: '' //Set initial value to empty string
        }
    }

    //Load user data from third party API
    componentDidMount() { //This is part of React Lifecycle, triggered after component mounts
        fetch('https://jsonplaceholder.typicode.com/users') //Make API call, returns an array of users
            .then(response=> response.json()) //Recieve response and convert it to json
            .then(users => {this.setState({ robots: users })}); //Update the state with contents 
    }

    //Function that fires whenever there is a change in the search form field
    onSearchChange = (event) => { //The event object is passed to this function. It contains the updated contents of the search box
        this.setState({searchfield: event.target.value }) // //Updates state with the new value in the search box. Whenever you update state it causes a re-render.
    }

    render() {
        const { robots, searchfield } = this.state; //Get robots and searchfield from props using destructuring.
        const filteredRobots = robots.filter(robot => { //filter() loops thru the roboys array and creates a new array containing only the values that pass the test in the provided function.
            return robot.name.toLowerCase().includes(searchfield.toLowerCase()) //includes() returns a value only if the robot name in the robots array matches the robot name in the search field.
        }) 
        return !robots.length ? //This uses a ternary to do an if else statement. If there are no users returned yet from the APi call, display loading..., else dispaly the users. "!robots.length" is the same as "robots.length === 0".
            <h1>Loading...</h1> :
            (
                <div className='tc'>
                    <h1 className='f2'>RoboFriends</h1> {/*className uses tachyons*/}
                    <SearchBox searchChange={this.onSearchChange}/> {/*onSearchChange function is passed as a prop to the SeachBox component*/}
                    <Scroll>
                        <CardList robots={filteredRobots}/>
                    </Scroll>
                </div>
            )
        }
    }

export default App;