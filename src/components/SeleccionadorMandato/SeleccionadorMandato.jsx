import React, { Component } from 'react'
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

import todosIcon from 'assets/img/icons/todos.svg'
import generoIcon from 'assets/img/icons/genero.svg'
import poblacionIcon from 'assets/img/icons/poblacion.svg'
import saludIcon from 'assets/img/icons/salud.svg'

export default class SeleccionadorMandato extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            dropdownOpen: false,
            color: "transparent"

        };
        this.toggle = this.toggle.bind(this);
        this.dropdownToggle = this.dropdownToggle.bind(this);
        this.sidebarToggle = React.createRef();
    }
    toggle() {
        if (this.state.isOpen) {
            this.setState({
                color: "transparent"
            });
        } else {
            this.setState({
                color: "dark"
            });
        }
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    dropdownToggle(e) {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    handleClick(id) {
        this.props.setMandato(id)
    }

    /*
                        () => {
                            switch (this.props.mandato) {
                                case 'genero':
                                    return generoIcon;
                                case 'desarrollo':
                                    return desarrolloIcon;
                                case 'poblacion':
                                    return poblacionIcon;
                                default:
                                    return todosIcon;
                            }
                        }
                    } 
    */

    selMandatoIcon() {
        switch (this.props.mandato) {
            case 'genero':
                return generoIcon;
            case 'poblacion':
                return poblacionIcon;
            case 'salud':
                return saludIcon;
            default:
                return todosIcon;
        }
}

render() {
    return (
        <Dropdown
            isOpen={this.state.dropdownOpen}
            toggle={e => this.dropdownToggle(e)}
        >
            <DropdownToggle caret nav className="dropdown-toggle-mandato">
                <img style={{maxHeight: '49.33px'}} src={this.selMandatoIcon()} />
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem tag="a" id="genero" onClick={() => this.handleClick("genero")}>Violencia de género</DropdownItem>
                <DropdownItem tag="a" id="salud" onClick={() => this.handleClick("salud")}>Salud reproductiva</DropdownItem>
                <DropdownItem tag="a" id="poblacion" onClick={() => this.handleClick("poblacion")}>Población y Desarrollo</DropdownItem>
                <DropdownItem tag="a" id="todos" onClick={() => this.handleClick("todos")}>Todos</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
}
