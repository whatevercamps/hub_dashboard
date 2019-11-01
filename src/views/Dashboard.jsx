import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
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

class Dashboard extends React.Component {
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
                        <i className="nc-icon nc-globe text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Paises Activos</p>
                        <CardTitle tag="p">{this.props.data ? this.props.data.activeCountries.size : 0} de 23</CardTitle>
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
                        <CardTitle tag="p">{this.props.projects ? this.props.projects.length : 0}</CardTitle>
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
                        <CardTitle tag="p">${this.props.data.totalRecieve}</CardTitle>
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
                        <i className="nc-icon nc-money-coins text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Egresos</p>
                        <CardTitle tag="p">${this.props.data.totalWaste}</CardTitle>
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
                    <i className="fa fa-circle text-primary" /> Concepto{" "}
                    <i className="fa fa-circle text-warning" /> Planeación{" "}
                    <i className="fa fa-circle text-danger" /> Implementación{" "}
                    <i className="fa fa-circle text-gray" /> Control{" "}
                    <i className="fa fa-circle text-gray" /> Cierre{" "}
                  </div>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-calendar" /> Total de proyectos: 46
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h5">Ingresos VS. Egresos</CardTitle>
                  <p className="card-category">Año 2019</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={() => {
                      let data = dashboardNASDAQChart.data;
                      data.datasets[0].data = this.props.data.timePayments;
                      data.datasets[1].data = this.props.data.timeWastes;
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
