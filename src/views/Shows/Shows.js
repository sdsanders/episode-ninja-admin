import React, { Component } from 'react';
import {
  Table,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col
} from 'reactstrap';

class Dashboard extends Component {

  constructor() {
    super();

    this.state = {
      shows: [],
      totalPageViews: 0
    };
  }

  componentWillMount() {
    fetch('https://episodes.stevendsanders.com/analytics/shows').then(response => {
      return response.json()
    }).then(shows => {
      console.log(shows);
      this.setState({shows: shows});
      this.setState({
        totalPageViews: shows.map(show => show.pageViews).reduce((prev, next) => Number(prev) + Number(next))
      });
    }).catch(err => {
      console.error(err);
    });
  }

  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <Table responsive bordered>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Views</th>
                  <th>Url</th>
                  <th>Products</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.shows.map((show, index) => (
                    <tr key={index}>
                      <td><a href={'/#/shows/' + show.slug}>{show.seriesName}</a></td>
                      <td>{show.pageViews}</td>
                      <td><a href={'https://episode.ninja/series/' + show.slug} target="_blank">https://episode.ninja/series/{show.slug}</a></td>
                      <td>
                        {show.products ? (
                          <Badge color="success">Yes</Badge>
                        ) : (
                          <Badge color="danger">No</Badge>
                        )}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default Dashboard;
