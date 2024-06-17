import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PropertyDetails from '../pages/PropertyDetails/PropertyDetails';
import Home from '../pages/Home/Home';
import { ROUTES } from './RouterConfig';
import BuyPage from '../pages/BuyPage/BuyPage';

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
        </Routes>
    </div>
  )
}

export default Router