import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import routes from "routes.js";

import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from "firebase";
import { firebaseConfig } from 'variables/Config';
import 'firebase/auth';
import 'firebase/database';

var ps;

const firebaseApp = firebase.initializeApp(firebaseConfig);


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
      projects: [],
      totalCountries: 23,
      mandatoActual: 'todos',
      projectActual: {}
    };
    this.mainPanel = React.createRef();

    if (firebase.apps.length === 0) {
      this.app = firebase.initializeApp(firebaseConfig);

    }

    this.db = firebase.firestore();
    this.auth = firebase.auth();

    this.providers = {
      googleProvider: new firebase.auth.GoogleAuthProvider(),
    };
  }


  calculate() {


    let activeCountries = new Set();
    let totalRecieve = 0;
    let totalWaste = 0;
    let payments = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let wastes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let fases = {
      concepto: 0,
      planeacion: 0,
      implementacion: 0,
      control: 0,
      cierre: 0
    }

    let moneyMandatos = {
      "salud reproductiva": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "población y estrategias de desarrollo": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "igualdad de género": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    }

    let filterProjects = this.state.projects.filter(project => {
      if (this.state.mandatoActual == "salud" && project.mandato == "salud reproductiva")
        return true

      else if (this.state.mandatoActual == "genero" && project.mandato == "igualdad de género")
        return true

      else if (this.state.mandatoActual == "poblacion" && project.mandato == "población y estrategias de desarrollo")
        return true

      else if (this.state.mandatoActual == "todos")
        return true
      else
        return false
    }
    )

    for (var project of filterProjects) {


      fases[project.fase] += 1
      if (project.active) {
        activeCountries.add(project.country)
      }


      let mandato = project.mandato
      let localTotal = 0
      for (var payment of project.recived) {
        totalRecieve += payment.amount
        let month = payment.date.toDate().getMonth()
        moneyMandatos[mandato][month] += payment.amount
        localTotal += payment.amount
      }

      project.totalRecieve = localTotal

    }

    let obj = { ...moneyMandatos }

    for (var mandatoP in moneyMandatos) {

      let s = 0;
      let res = []
      for (var money of moneyMandatos[mandatoP]) {
        res.push(s += money)
      }

      obj[mandatoP] = res
    }

    return {
      activeCountries: activeCountries,
      totalRecieve: totalRecieve,
      totalWaste: totalWaste,
      fases: Object.values(fases),
      timePayments: payments,
      moneyMandatos: obj,
      projects: filterProjects
    }

  }


  componentDidMount() {
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
    this.setState({ mandatoActual: e });
  }


  handleClickProject = (e) => {
    console.log(e)
    this.setState({projectActual: e})
    console.log(this.state)

  }

  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;

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
                      handleClickProject={this.handleClickProject}
                      mandato={this.state.mandatoActual}
                      data={this.calculate()}
                      projectActive={this.state.projectActual}
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


const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

// export default Dashboard;
export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Dashboard);