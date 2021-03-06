import React from 'react';
import { Registro } from '../components/Registro';
import { Selector } from '../components/Selector';
import { Loby } from '../components/Loby';
import { Carga } from '../components/onGame/Carga';
import { Host } from '../components/onGame/Host';
import { Jugador } from '../components/onGame/Jugador';
import { Soborno } from '../components/onGame/Soborno';

import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from 'react-router-dom';
import { PruebaAnim } from '../components/PruebaAnim';

export const AppRouter = () => {
    return(
        <Router>
            <Switch>
                <Route path="/registro" component= {Registro} />
                <Route path="/loby" component= {Loby} />
                <Route path="/carga" component= {Carga} />
                <Route path="/jugador" component= {Jugador}/>
                <Route path="/host" component= {Host}/>
                <Route path="/soborno" component= {Soborno}/>
                <Route path="/" component= {Selector} />
                
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}