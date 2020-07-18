//snippet rce
import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';

export class GameCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { title, name, released, updated, background_image, rating, website } = this.props.game;
    return (
      <div>
        <Card>
          <CardImg top width="100%" src={background_image} alt="Card image cap" />
          <CardBody>
            <CardTitle>{name}</CardTitle>
            <CardText><b>Release Date:</b><br></br>{released}</CardText>
            <CardText><b>Last Update Date:</b><br></br>{updated}</CardText>
            <CardText><b>Game Rating:</b><br></br>{rating}</CardText>
            <CardText><a href = {website}>{website}</a></CardText>

            <Button
              color="primary"
              onClick={() => this.props.removeGame(title)}
            >
              Delete
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default GameCard;
