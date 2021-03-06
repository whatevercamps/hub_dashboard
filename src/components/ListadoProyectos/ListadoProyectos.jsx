import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import {
    Table
} from "reactstrap";


export default class ListadoProyectos extends Component {

    constructor(props) {
        super(props)

        console.log(props)

        this.state = {
            toDetail: false
        }
    }


    handleClick(e) {
        this.props.setProject(e);
        this.setState({toDetail : true})
    }

    componentWillMount(){
        this.setState({toDetail: false})
    }

    render() {
        if (this.state.toDetail === true) {
            return <Redirect to='detailProyecto' />
          }
        return (
            <Table responsive>
                <thead className="text-primary">
                    <tr>
                        <th>Nombre</th>
                        <th>Ciudad</th>
                        <th className="text-right">Meta</th>
                        <th className="text-right">Recaudado</th>
                        <th>Fase</th>
                        <th>Mandato</th>
                        <th className="text-right">C/B</th>
                        <th className="text-right">Replicabilidad</th>
                        <th className="text-right">Sostenibilidad</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.projects.map((d, index) => {
                        return <tr onClick={() => this.handleClick(d)} key={index} >
                                <td>{d.name}</td>
                                <td>{d.City}</td>
                                <td className="text-right">{d.meta}</td>
                                <td className="text-right">{d.totalRecieve}</td>
                                <td>{d.fase}</td>
                                <td>{d.mandato}</td>
                                <td className="text-right">{d["costo/beneficio"]}</td>
                                <td className="text-right">{d.replicabilidad}</td>
                                <td className="text-right">{d.sostenibilidad}</td>
                        </tr>
                    })}
                </tbody>
            </Table>
        )
    }
}
