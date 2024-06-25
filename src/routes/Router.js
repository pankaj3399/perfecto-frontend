import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PropertyDetails from '../pages/PropertyDetails/PropertyDetails';
import Home from '../pages/Home/Home';
import { ROUTES } from './RouterConfig';
import BuyPage from '../pages/BuyPage/BuyPage';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import RefrralDashboard from '../pages/RefrralDashboard/RefrralDashboard';

const Router = () => {

    const RouteWithRole = ({ Element }) => {
        return (
          <>
            <Element/>
          </>
        );
      }

  return (
    <div>
        <Routes>
            <Route exact path={ROUTES.Home} element={<RouteWithRole Element={Home} component={Home} />}></Route>
            <Route exact path={ROUTES.PropertyDetails} element={<RouteWithRole Element={PropertyDetails} component={PropertyDetails} />}></Route>
            <Route exact path={ROUTES.BuyPage} element={<RouteWithRole Element={BuyPage} component={BuyPage} />}></Route>
            <Route exact path={ROUTES.Login} element={<RouteWithRole Element={Login} component={Login} />}></Route>
            <Route exact path={ROUTES.SignUp} element={<RouteWithRole Element={SignUp} component={SignUp} />}></Route>
            <Route exact path={ROUTES.RefrralDashboard} element={<RouteWithRole Element={RefrralDashboard} component={RefrralDashboard} />}></Route>
        </Routes> 
    </div>
  )
}

export default Router