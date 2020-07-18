import React, { Component } from 'react';
import './App.css';
import GameCard from './GameCard';
import axios from 'axios';

import {
  Jumbotron,
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
      title: '',
      games: [
        { background_image: '', title: 'hello world', name: '', released: '', updated: '', rating: '', website: '' },
        { background_image: '', title: 'hello world', name: '', released: '', updated: '', rating: '', website: '' },
        { background_image: '', title: 'hello world', name: '', released: '', updated: '', rating: '', website: '' },
        { background_image: '', title: 'hello world', name: '', released: '', updated: '', rating: '', website: '' },
        { background_image: '', title: 'hello world', name: '', released: '', updated: '', rating: '', website: '' },
        { background_image: '', title: 'hello world', name: '', released: '', updated: '', rating: '', website: '' },
        { background_image: '', title: 'hello world', name: '', released: '', updated: '', rating: '', website: '' },
        { background_image: '', title: 'hello world', name: '', released: '', updated: '', rating: '', website: '' },
        { background_image: '', title: 'hello world', name: '', released: '', updated: '', rating: '', website: '' },
        { background_image: '', title: 'hello world', name: '', released: '', updated: '', rating: '', website: '' },
        { background_image: '', title: 'hello world', name: '', released: '', updated: '', rating: '', website: '' },
        { background_image: '', title: 'hello world', name: '', released: '', updated: '', rating: '', website: '' },
        { background_image: '', title: 'hello world', name: '', released: '', updated: '', rating: '', website: '' },
        { background_image: '', title: 'hello world', name: '', released: '', updated: '', rating: '', website: '' },
        { background_image: '', title: 'hello world', name: '', released: '', updated: '', rating: '', website: '' }
      ]
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  //for popup
  onDismiss() {
    this.setState({ alertVisible: false });
  }

  getAllGames = () => {
    axios
      .get('/getallgames')
      .then(result => {
        this.setState({ games: result.data });
        console.log(this.state.games);
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getAllGames();
  }

  //for form
  onSubmit = e => {
    e.preventDefault();
    this.setState({ alertVisible: false });
    //console.log(this.state.title);

    const query = `/getgame?title=${this.state.title}`;

    console.log(query);

    axios
      .get(query)
      .then(result => {
        console.log(result.data);
        if (result.data === 'Not found') {
          this.setState({ alertVisible: true });
        }
        this.getAllGames();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  };

  // for form field
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  removeGame(title) {
    this.setState({
      games: this.state.games.filter(game => {
        if (game.title !== title) return game;
      })
    });
    const query = `/deletegame?title=${title}`;
    axios
      .get(query)
      .then(result => {
        this.getAllGames();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Jumbotron>
            <h1 className="display-4">Game Search</h1>
            <p className="lead">Search for the details of your favourite games in the easiest way possible!</p>
          </Jumbotron>
          <Row>
            <Col>
              <Alert
                color="danger"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
                Movie not found
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter game : counter-strike-global-offensive"
                    onChange={this.onChange}
                  />
                </FormGroup>
                <Button color="primary btn-lg btn-block">Search</Button>
              </Form>
            </Col>
          </Row>
          <p />
          <Row>
          <Col sm="6" key={this.state.games[this.state.games.length-1]}>
              <GameCard
                removeGame={this.removeGame.bind(this)}
                game={this.state.games[this.state.games.length-1]}
              />
            </Col>
            <Col sm="6" key={this.state.games[this.state.games.length-2]}>
              <GameCard
                removeGame={this.removeGame.bind(this)}
                game={this.state.games[this.state.games.length-2]}
              />
            </Col>
            </Row>
            <p />
            <Row>
            <Col sm="6" key={this.state.games[this.state.games.length-3]}>
              <GameCard
                removeGame={this.removeGame.bind(this)}
                game={this.state.games[this.state.games.length-3]}
              />
            </Col>
            <Col sm="6" key={this.state.games[this.state.games.length-4]}>
              <GameCard
                removeGame={this.removeGame.bind(this)}
                game={this.state.games[this.state.games.length-4]}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
