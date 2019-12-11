import React from "react";

// reactstrap components
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

class NuevoProyecto extends React.Component {
    render() {
        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="2"></Col>
                        <Col md="8">
                            <Card className="card-user">
                                <CardHeader>
                                    <CardTitle tag="h5">Registrar proyecto</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <Row>
                                            <Col className="pr-1" md="5">
                                                <FormGroup>
                                                    <label>Pertenece a</label>
                                                    <Input
                                                        defaultValue="UNFPA"
                                                        disabled
                                                        placeholder="Company"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="px-1" md="3">
                                                <FormGroup>
                                                    <label>Nombre del proyecto</label>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Nombre"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="pl-1" md="4">
                                                <FormGroup>
                                                    <label htmlFor="exampleInputEmail1">
                                                        Email address
                          </label>
                                                    <Input placeholder="Email" type="email" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-1" md="6">
                                                <FormGroup>
                                                    <label>Meta de recaudo</label>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="$$$$$"
                                                        type="number"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="pl-1" md="6">
                                                <FormGroup>
                                                    <label>Recaudado hasta ahora</label>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="$30000"
                                                        type="number"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>Tags (separados por comas)</label>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Machine Learning, Embarazo adolescente"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-1" md="4">
                                                <FormGroup>
                                                    <label>Sostenibilidad</label>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="0 a 1"
                                                        type="number"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="px-1" md="4">
                                                <FormGroup>
                                                    <label>Replicabilidad</label>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="0 a 1"
                                                        type="number"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="pl-1" md="4">
                                                <FormGroup>
                                                    <label>Costo/beneficio</label>
                                                    <Input placeholder="0 a 1" type="number" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>Acerca del proyecto</label>
                                                    <Input
                                                        type="textarea"
                                                        defaultValue=""
                                                        placeholder="Describa brevemente el proyecto"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <div className="update ml-auto mr-auto">
                                                <Button
                                                    className="btn-round"
                                                    color="primary"
                                                    type="submit"
                                                >
                                                    Crear Proyecto
                        </Button>
                                            </div>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="2"></Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default NuevoProyecto;
