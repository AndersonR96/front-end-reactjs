import React from "react";
import { Route, NavLink, HashRouter, } from "react-router-dom";

import { AppBar, Button, Toolbar } from '@material-ui/core';
import User from "./components/User";
import Departament from "./components/Departament";

function Main() {
    return (
        <HashRouter>
            <div>
                <h1>Empresa</h1>
                <AppBar>
                    <Toolbar className="header">
                        <div>
                        <Button variant="contained" color="sucess"><NavLink to="/users" replace>Usuarios</NavLink></Button>
                        </div>
                        <Button variant="contained" color="sucess"><NavLink to="/departaments" replace>Departamentos</NavLink></Button>
                    </Toolbar>
                </AppBar>
                <div className="content">
                    <Route path="/users" component={User} />
                    <Route path="/departaments" component={Departament} />
                </div>
            </div>
        </HashRouter>
    )
}

export default Main;