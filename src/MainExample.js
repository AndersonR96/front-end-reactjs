import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter,
} from "react-router-dom";
import User from "./components/User";
import Departament from "./components/Departament"

class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <h1>Empresa</h1>
                    <ul className="header">
                        <li><NavLink to="/users">Usuarios</NavLink></li>
                        <li><NavLink to="/departaments">Departamentos</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route path="/users" component={User}/>
                        <Route path="/departaments" component={Departament}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default Main;