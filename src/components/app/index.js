import React from "react";
import { Route, HashRouter, Link, } from "react-router-dom";

import { AppBar, Button, Toolbar } from '@material-ui/core';
import User from "../users";
import Departament from "../departaments";
import './styles.css';

function App() {
    return (
        <HashRouter>
            <div>
                <div>
                <AppBar>
                    <Toolbar className="header">
                        <Button className="navButtons" variant="outlined" component={Link} to="/users">Usuarios</Button>
                        <Button className="navButtons" variant="outlined" component={Link} to="/departaments">Departamentos</Button>
                        
                    </Toolbar>
                </AppBar>
                </div>
                <div className="content">
                    <Route path="/users" component={User} />
                    <Route path="/departaments" component={Departament} />
                </div>
            </div>
        </HashRouter>
    )
}

export default App;