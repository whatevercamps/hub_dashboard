import React, { Component } from 'react'
import User from "./User.jsx"

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col
} from "reactstrap";


import { Line, Pie } from "react-chartjs-2";

import {
    dashboard24HoursPerformanceChart,
    dashboardEmailStatisticsChart,
    dashboardNASDAQChart
  } from "variables/charts.jsx";



export default class DetailProyecto extends Component {


    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    render() {

        let data = this.props.projectActive

        if(this.isEmpty(data)){
            return(<></>)
        }

        let payments = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let localTotal = 0
        for (var payment of data.recived) {
            let month = payment.date.toDate().getMonth()
            payments[month] += payment.amount
            localTotal += payment.amount
        }
        

        console.log(data,"no entiendo")
        return (
            <>
              <div className="content">
                <Row>
                  <Col md="4">
                    <Card className="card-user">
                      <div className="image">
                        <img
                          alt="..."
                          src={require("assets/img/damir-bosnjak.jpg")}
                        />
                      </div>
                      <CardBody>
                        <div className="author">
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            <img
                              alt="..."
                              className="avatar border-gray"
                              src={data.image}
                            />
                            <h5 className="title">{data.Owner}</h5>
                          </a>
                            <p className="description">@{data.twitter}</p>
                        </div>
                      </CardBody>
                      
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle tag="h4">Miembros</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <ul className="list-unstyled team-members">
                          <li>
                            <Row>
                              <Col md="2" xs="2">
                                <div className="avatar">
                                  <img
                                    alt="..."
                                    className="img-circle img-no-padding img-responsive"
                                    src={require("assets/img/faces/ayo-ogunseinde-2.jpg")}
                                  />
                                </div>
                              </Col>
                              <Col md="7" xs="7">
                                DJ Khaled <br />
                                <span className="text-muted">
                                </span>
                              </Col>
                              <Col className="text-right" md="3" xs="3">
                                <Button
                                  className="btn-round btn-icon"
                                  color="success"
                                  outline
                                  size="sm"
                                >
                                  <i className="fa fa-envelope" />
                                </Button>
                              </Col>
                            </Row>
                          </li>
                          <li>
                            <Row>
                              <Col md="2" xs="2">
                                <div className="avatar">
                                  <img
                                    alt="..."
                                    className="img-circle img-no-padding img-responsive"
                                    src={require("assets/img/faces/joe-gardner-2.jpg")}
                                  />
                                </div>
                              </Col>
                              <Col md="7" xs="7">
                                Creative Tim <br />
                                <span className="text-success">
                                </span>
                              </Col>
                              <Col className="text-right" md="3" xs="3">
                                <Button
                                  className="btn-round btn-icon"
                                  color="success"
                                  outline
                                  size="sm"
                                >
                                  <i className="fa fa-envelope" />
                                </Button>
                              </Col>
                            </Row>
                          </li>
                          <li>
                            <Row>
                              <Col md="2" xs="2">
                                <div className="avatar">
                                  <img
                                    alt="..."
                                    className="img-circle img-no-padding img-responsive"
                                    src={require("assets/img/faces/clem-onojeghuo-2.jpg")}
                                  />
                                </div>
                              </Col>
                              <Col className="col-ms-7" xs="7">
                                Flume <br />
                                <span className="text-danger">
                                </span>
                              </Col>
                              <Col className="text-right" md="3" xs="3">
                                <Button
                                  className="btn-round btn-icon"
                                  color="success"
                                  outline
                                  size="sm"
                                >
                                  <i className="fa fa-envelope" />
                                </Button>
                              </Col>
                            </Row>
                          </li>
                        </ul>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="8">
                    <Card className="card-user">
                      <CardHeader>
                        <CardTitle tag="h5">Datos</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Form>
                          <Row>
                            <Col className="pr-1" md="5">
                              <FormGroup>
                                <label>Nombre</label>
                                <Input
                                  value={data.name}
                                  placeholder="Company"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                            <Col className="px-1" md="3">
                              <FormGroup>
                                <label>Meta</label>
                                <Input
                                  value={data.meta}
                                  placeholder="Username"
                                  type="number"
                                />
                              </FormGroup>
                            </Col>
                            <Col className="pl-1" md="4">
                              <FormGroup>
                                <label>Recaudado</label>
                                <Input
                                  value={localTotal}
                                  placeholder="Username"
                                  type="number"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="pr-1" md="3">
                              <FormGroup>
                                <label>Fase</label>
                                <Input
                                  value={data.fase}
                                  placeholder="Company"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                            <Col className="px-1" md="4">
                              <FormGroup>
                                <label>Mandato</label>
                                <Input
                                  value={data.mandato}
                                  placeholder="Username"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                            <Col className="pl-1" md="2">
                              <FormGroup>
                                <label>Sostenibilidad</label>
                                <Input
                                  value={data.sostenibilidad}
                                  placeholder="Username"
                                  type="number"
                                />
                              </FormGroup>
                            </Col>
                            <Col className="pl-1" md="2">
                              <FormGroup>
                                <label>Replicabilidad</label>
                                <Input
                                  value={data.replicabilidad}
                                  placeholder="Username"
                                  type="number"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                          </Row>
                          <Row>
                            <Col className="pr-1" md="4">
                              <FormGroup>
                                <label>Ciudad</label>
                                <Input
                                  value={data.City}
                                  placeholder="City"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                            <Col className="px-1" md="4">
                              <FormGroup>
                                <label>pais</label>
                                <Input
                                  value={data.country}
                                  placeholder="Country"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                <label>Descripción</label>
                                <Input
                                  type="textarea"
                                  value={data.description}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Form>
                      </CardBody>
                    </Card>
                    <Col md="12">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h5">Recaudo mensual</CardTitle>
                  <p className="card-category">Año 2019</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={() => {
                      let dataq = {...dashboardNASDAQChart.data};
                      

                        dataq.datasets[0].data = payments
                        dataq.datasets[1].data = payments
                        dataq.datasets[2].data = payments
                      return dataq;
                    }}
                    options={dashboardNASDAQChart.options}
                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter>
                  <div className="chart-legend">
                <i className="fa fa-circle i_salud" /> {data.mandato}{"  "}
                  </div>
                  <hr />
                  <div className="card-stats">
                    <i className="fa fa-check" /> Recaudo mensual acumulado por mandato 
                  </div>
                </CardFooter>
              </Card>
            </Col>
                  </Col>
                </Row>
              </div>
            </>
          );
    }
}
