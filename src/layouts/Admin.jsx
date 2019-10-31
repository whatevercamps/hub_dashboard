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

    };
    this.mainPanel = React.createRef();

    if (firebase.apps.length === 0)
    {
    this.app = firebase.initializeApp(firebaseConfig);
    
    }
    this.db = firebase.firestore();
    
  }


  calculate(){


    let activeCountries = new Set();
    let totalRecieve = 0;
    let totalWaste = 0;
    let payments = [];
    for(var project of this.state.projects)
    {
      console.log(project)
      if (project.active){
        activeCountries.add(project.country)
      }

      for(var payment of project.recived)
      {
        totalRecieve+=payment.amount
        console.log(payment)
      }

      for(var waste of project.wasted)
      {
        totalWaste+=waste.amount
      }


    }
    console.log(totalRecieve,totalWaste)
    return {activeCountries:activeCountries}

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

        this.setState({projects})

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
        <DemoNavbar {...this.props} pruebaProps={["a","b","c"]} />
          <Switch>
            {routes.map((prop, key) => {
              return (
                <Route
                  data={this.calculate()}
                  path={prop.layout + prop.path}
                  render={props => (
                    <prop.component
                      {...props}
                      pruebajeje={["a", "b"]}
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
