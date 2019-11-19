import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
import { Line as ProgressBar, Circle as ProgressCircle } from 'rc-progress';
import FitText from '@kennethormandy/react-fittext'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import SeleccionadorMandato from 'components/SeleccionadorMandato/SeleccionadorMandato'
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart
} from "variables/charts.jsx";

import './dashboard.css'
import { buildChildren } from "@babel/types";

class Dashboard extends React.Component {

  manejarDineros = (n) => {
    var ranges = [
      { divider: 1e9, suffix: 'MM' },
      { divider: 1e6, suffix: 'M' },
      { divider: 1e3, suffix: 'K' }
    ];
    n = n*1000
    for (var i = 0; i < ranges.length; i++) {
      if (n >= ranges[i].divider) {
        return (n / ranges[i].divider).toString() + ranges[i].suffix;
      }
    }
    return n.toString();

  }

  render() {
    console.log(this.props)
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        {/* <i className="nc-icon nc-chat-33 text-warning" /> */}
                        <SeleccionadorMandato setMandato={this.props.handleChangeMandato} mandato={this.props.mandato} />

                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Mandato</p>
                        <FitText compressor={0.7}>
                          <CardTitle tag="p">{this.props.mandato || 'todos'}</CardTitle>
                        </FitText>

                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" />
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-vector text-info" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Proyectos</p>
                        <CardTitle tag="p">{this.props.data && this.props.data.projects ? this.props.data.projects.length : 0}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="far fa-clock" /> {this.props.closurePhaseProjects} en fase de cierre
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-money-coins text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Ingresos</p>
                        <CardTitle tag="p">${this.manejarDineros(this.props.data.totalRecieve)}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="far fa-calendar" /> Actualizado ayer
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <div style={{ width: '80%', padding: '0', margin: '0' }}>

                          <CircularProgressbar value={70} text={`${70}%`} styles={buildStyles({
                            textColor: '#d3d3d3',
                            pathColor: `#6bd098`,
                            trailColor: '#d3d3d3'
                          })} />


                        </div>


                        {/* <FitText compressor={0.85}>
                          <h1 style={{marginBottom:'0px'}}>70<small>%</small></h1>
                          </FitText> */}
                        {/* <ProgressCircle percent="70" strokeWidth="6" strokeColor="#6bd098" /> */}
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Progreso</p>
                        <CardTitle tag="p">
                          <ProgressBar percent="70" strokeWidth="6" strokeColor="#6bd098" />
                        </CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="far fa-calendar" /> Actualizado ayer
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Estado Proyectos</CardTitle>
                  <p className="card-category">Al último cierre</p>
                </CardHeader>
                <CardBody>
                  <Pie
                    data={() => {
                      let data = dashboardEmailStatisticsChart.data();
                      data.datasets[0].data = this.props.data.fases;
                      console.log(data)
                      return data;
                    }}
                    options={dashboardEmailStatisticsChart.options}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle i_concept" /> Concepto{" "}
                    <i className="fa fa-circle i_plan" /> Planeación{" "}<br />
                    <i className="fa fa-circle i_imple" /> Implementación{" "}
                    <i className="fa fa-circle i_control" /> Control{" "}
                    <i className="fa fa-circle i_cierre" /> Cierre{" "}
                  </div>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-calendar" /> Total de proyectos: {this.props.data && this.props.data.projects ? this.props.data.projects.length : 0}
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h5">Mandatos</CardTitle>
                  <p className="card-category">Año 2019</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={() => {
                      let data = dashboardNASDAQChart.data;
                      data.datasets[0].data = this.props.data.moneyMandatos['salud reproductiva'];
                      data.datasets[1].data = this.props.data.moneyMandatos['población y estrategias de desarrollo'];
                      data.datasets[2].data = this.props.data.moneyMandatos['igualdad de género'];
                      console.log(data)
                      return data;
                    }}
                    options={dashboardNASDAQChart.options}
                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter>
                  <div className="chart-legend">
                    <i className="fa fa-circle text-info" /> ECHO{" "}
                    <i className="fa fa-circle text-warning" /> Planea App
                  </div>
                  <hr />
                  <div className="card-stats">
                    <i className="fa fa-check" /> Ver otros
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Lista resumen de proyectos</CardTitle>
                  <p className="card-category">Hace 24 horas</p>
                </CardHeader>
                <CardBody>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-history" /> Updated 3 minutes ago
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
