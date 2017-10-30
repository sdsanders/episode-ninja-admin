import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Label,
  Form
} from 'reactstrap';

class Show extends Component {

  constructor() {
    super();

    this.state = {
      show: {},
      newProduct: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
  }

  componentWillMount() {
    fetch(`https://episodes.stevendsanders.com/episodes/${this.props.match.params.slug}`, {
      cache: 'no-store'
    }).then(response => {
      return response.json()
    }).then(show => {
      this.setState({show: show});
    }).catch(err => {
      console.error(err);
    });
  }

  handleChange(event) {
    this.setState({newProduct: event.target.value});
  }

  addProduct(event) {
    fetch(`https://episodes.stevendsanders.com/products/${this.props.match.params.slug}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({asin: this.state.newProduct})
    }).then(response => {
      return response.json();
    }).then(() => {
      this.state.show.products = this.state.show.products || [];
      console.log(this.state.show.products);
      this.state.show.products.push(this.state.newProduct);
      this.setState({
        newProduct: '',
        show: this.state.show
      });
    }).catch(err => {
      console.error(err);
    });

    event.preventDefault();
  }

  removeProduct(asin, index, event) {
    fetch(`https://episodes.stevendsanders.com/products/${this.props.match.params.slug}/${asin}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      return response.json();
    }).then(() => {
      this.state.show.products.splice(index, 1);
      console.log(this.state.show.products);
      this.setState({
        show: this.state.show
      });
    }).catch(err => {
      console.error(err);
    });
  }

  updateShow() {
    fetch(`https://episodes.stevendsanders.com/importshow/${this.props.match.params.slug}`, {
      method: 'GET'
    }).then(response => {
      return response.json();
    }).then(() => {

    }).catch(err => {
      console.error(err);
    });
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <h1>{this.state.show.seriesName}</h1>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="12" sm="6" md="4">
              <Card>
                <CardHeader>
                  Show Info
                </CardHeader>
                <CardBody>
                  <p><strong>Last Updated:</strong> {this.state.show.updatedAt}</p>
                  <p><strong>Total Episodes:</strong> {this.state.show.totalEpisodes}</p>
                  <Button color="primary" size="lg" block>Run Show Updater</Button>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" sm="6" md="4">
              <Card>
                <CardHeader>
                  Products
                </CardHeader>
                <ListGroup>
                  { this.state.show.products && this.state.show.products.map((product, index) => (
                      <ListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                        <a href={`https://amazon.com/dp/${product}`} target="_blank">{product}</a>
                        <Button color="danger" size="sm" onClick={(e) => this.removeProduct(product, index, e)} title="Remove"><i className="fa fa-minus"></i></Button>
                      </ListGroupItem>
                    ))
                  }
                  <ListGroupItem>
                    <Form onSubmit={this.addProduct}>
                      <Label htmlFor="newProduct">Add Product</Label>
                      <Input type="text" id="newProduct" placeholder="Enter an ASIN" value={this.state.newProduct} onChange={this.handleChange} required/>
                    </Form>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }
}

export default Show;
