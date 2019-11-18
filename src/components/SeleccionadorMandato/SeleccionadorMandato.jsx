import React, { Component } from 'react'
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

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

    render() {
        return (
            <Dropdown
                isOpen={this.state.dropdownOpen}
                toggle={e => this.dropdownToggle(e)}
            >
                <DropdownToggle caret nav>
                    <i className="nc-icon nc-bell-55" />
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem tag="a" id="genero">V. género</DropdownItem>
                    <DropdownItem tag="a" id="poblacion">Población</DropdownItem>
                    <DropdownItem tag="a" id="desarrollo">Desarrollo</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        )
    }
}
