import React, { Component } from 'react';
import { Line, Bar } from 'react-chartjs-2';
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

const brandPrimary = '#20a8d8';
const brandSuccess = '#4dbd74';
const brandInfo = '#63c2de';
const brandWarning = '#f8cb00';
const brandDanger = '#f86c6b';


const cardChartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      display: false
    }],
    yAxes: [{
      display: false
    }],
  },
  elements: {
    line: {
      borderWidth: 2
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}

class Dashboard extends Component {

  constructor() {
    super();

    this.state = {
      analytics: {
        totalPageViews: 0,
        totalShows: 0,
        sessionsToday: 0,
        activeUsers: 0,
        totalShowsOverTime: {
          labels: [],
          datasets: [
            {
              label: 'Shows',
              backgroundColor: 'rgba(255,255,255,.2)',
              borderColor: 'rgba(255,255,255,.55)',
              data: []
            }
          ],
        },
        pageViewsOverTime: {
          labels: [],
          datasets: [
            {
              label: 'Page views',
              backgroundColor: 'rgba(255,255,255,.2)',
              borderColor: 'rgba(255,255,255,.55)',
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: []
            }
          ]
        },
        pageViewsPerMinute: {
          labels: [],
          datasets: [
            {
              label: 'Page views',
              backgroundColor: 'rgba(255,255,255,.3)',
              borderColor: 'transparent',
              data: []
            }
          ],
        }
      }
    };
  }

  componentWillMount() {
    this.getAnalytics();
  }

  getAnalytics() {
    fetch('https://episodes.stevendsanders.com/analytics', {
      cache: 'no-cache'
    }).then(response => {
      return response.json()
    }).then(analytics => {
      this.state.analytics.totalShowsOverTime.labels = analytics.totalShowsOverTime.map(row => '');
      this.state.analytics.totalShowsOverTime.datasets[0].data = analytics.totalShowsOverTime;
      this.state.analytics.pageViewsOverTime.labels = analytics.pageViewsOverTime.map(row => `${row[0].substring(4, 6)}/${row[0].substring(6, 8)}`);
      this.state.analytics.pageViewsOverTime.datasets[0].data = analytics.pageViewsOverTime.map(row => row[1]);
      this.state.analytics.totalPageViews = analytics.pageViewsOverTime.map(row => row[1]).reduce((prev, next) => Number(prev) + Number(next));
      this.state.analytics.totalShows = analytics.totalShows;
      this.state.analytics.sessionsToday = analytics.sessionsToday;
      this.state.analytics.pageViewsPerMinute.labels = analytics.pageViewsPerMinute.labels;
      this.state.analytics.pageViewsPerMinute.datasets[0].data = analytics.pageViewsPerMinute.values;
      this.state.analytics.activeUsers = analytics.activeUsers;

      this.setState({analytics: this.state.analytics});
    }).catch(err => {
      console.error(err);
    });

    setTimeout(() => this.getAnalytics(), 30000);
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <h4 className="mb-0">{this.state.analytics.totalShows}</h4>
                <p>Total Shows</p>
              </CardBody>
              <div className="chart-wrapper px-0" style={{height:'70px'}}>
                <Line data={this.state.analytics.totalShowsOverTime} options={cardChartOptions} height={70}/>
              </div>
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <h4 className="mb-0">{this.state.analytics.totalPageViews}</h4>
                <p>Total Page Views (Last 30 Days)</p>
              </CardBody>
              <div className="chart-wrapper px-0" style={{height:'70px'}}>
                <Line data={this.state.analytics.pageViewsOverTime} options={cardChartOptions} height={70}/>
              </div>
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <h4 className="mb-0">{this.state.analytics.activeUsers}</h4>
                <p>Users Right Now</p>
              </CardBody>
              <div className="chart-wrapper px-0" style={{height:'70px'}}>
                <Bar data={this.state.analytics.pageViewsPerMinute} options={cardChartOptions} height={70}/>
              </div>
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <h4 className="mb-0">{this.state.analytics.sessionsToday}</h4>
                <p>Sessions Today (So Far)</p>
              </CardBody>
              <div className="chart-wrapper px-0" style={{height:'70px'}}>
                <Line data={this.state.analytics.pageViewsOverTime} options={cardChartOptions} height={70}/>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Dashboard;
