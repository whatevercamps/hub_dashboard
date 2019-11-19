import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import routes from "routes.js";

import firebase from "firebase";
import { firebaseConfig } from 'variables/Config';
import 'firebase/database';

var ps;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
      projects: [],
      totalCountries: 23,
      mandatoActual: 'todos'

    };
    this.mainPanel = React.createRef();

    if (firebase.apps.length === 0) {
      this.app = firebase.initializeApp(firebaseConfig);

    }
    this.db = firebase.firestore();

  }


  calculate() {


    let activeCountries = new Set();
    let totalRecieve = 0;
    let totalWaste = 0;
    let payments = [0,0,0,0,0,0,0,0,0,0,0,0];
    let wastes = [0,0,0,0,0,0,0,0,0,0,0,0];
    let fases = {
      concepto:0,
      planeacion:0,
      implementacion:0,
      control:0,
      cierre:0
    }

    let moneyMandatos = {
      "salud reproductiva": [0,0,0,0,0,0,0,0,0,0,0,0],
      "estrategias de desarrollo":[0,0,0,0,0,0,0,0,0,0,0,0],
      "igualdad de género y población":[0,0,0,0,0,0,0,0,0,0,0,0],
    }

    for (var project of this.state.projects) {
      

      fases[project.fase] +=1
      if (project.active) {
        activeCountries.add(project.country)
      }

      
      let mandato = project.mandato
      let localTotal = 0
      for (var payment of project.recived) {
        totalRecieve += payment.amount
        let month = payment.date.toDate().getMonth()

        moneyMandatos[mandato][month] +=payment.amount
        localTotal += payment.amount
      }

      project.totalRecieve = localTotal

      for (var waste of project.wasted) {
        totalWaste += waste.amount
        let month = waste.date.toDate().getMonth()
        wastes[month] += waste.amount
      }


    }
    console.log({ activeCountries: activeCountries,
      totalRecieve: totalRecieve,
       totalWaste: totalWaste,
       fases:Object.values(fases),
       timePayments:payments,
       timeWastes: wastes,
       moneyMandatos: moneyMandatos,
       projects:this.state.projects})
    return { activeCountries: activeCountries,
       totalRecieve: totalRecieve,
        totalWaste: totalWaste,
        fases:Object.values(fases),
        timePayments:payments,
        timeWastes: wastes,
        moneyMandatos: moneyMandatos,
        projects:this.state.projects}

  }


  componentDidMount() {
    console.log("consoleDidMount")
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");

    }
  }
  componentWillMount() {

    this.db.collection("projects")
      .onSnapshot(snapshot => {
        let projects = []
        snapshot.forEach(doc =>
          projects.push(doc.data())
        );

        this.setState({ projects })

      })

  }

  componentDidMount() {
  }


  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleActiveClick = color => {
    this.setState({ activeColor: color });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };

  handleChangeMandato = (e) => {
    console.log('hliiii', e)
    this.setState({ mandatoActual: e });
  }

  render() {
    this.calculate()
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbar {...this.props} pruebaProps={["a", "b", "c"]} />
          <Switch>
            {routes.map((prop, key) => {
              return (
                <Route
                  data={this.calculate()}
                  path={prop.layout + prop.path}
                  render={props => (
                    <prop.component
                      {...props}
                      handleChangeMandato={this.handleChangeMandato}
                      mandato={this.state.mandatoActual}
                      data={this.calculate()}
                    />
                  )}
                  key={key}
                />
              );
            })}
          </Switch>
          {/* <Footer fluid /> */}
        </div>
        {/* <FixedPlugin
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
          handleActiveClick={this.handleActiveClick}
          handleBgClick={this.handleBgClick}
        /> */}
      </div>
    );
  }
}

export default Dashboard;
