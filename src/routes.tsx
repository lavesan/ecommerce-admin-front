import { Route, Routes, Outlet } from "react-router-dom";

import { UnLoggedLayout } from "@components/UnLoggedLayout/index";
import { LoggedLayout } from "@components/LoggedLayout/index";

import Login from "@containers/Login";
import Home from "@containers/Home";
import Enterprises from "@containers/Enterprises";
import Orders from "@containers/Orders";
import Categories from "@containers/Categories";
import Products from "@containers/Products";
import Promotions from "@containers/Promotions";
import Clients from "@containers/Clients";
import Users from "@containers/Users";
import { useAuthenticate } from "@hooks/useAuthenticate";
import EnterpriseCreateOrEdit from "@containers/EnterpriseCreateOrEdit";

const Router = () => {
  useAuthenticate();

  return (
    <Routes>
      <Route
        element={
          <UnLoggedLayout>
            <Outlet />
          </UnLoggedLayout>
        }
      >
        <Route path="/login" element={<Login />} />
      </Route>
      <Route
        element={
          <LoggedLayout>
            <Outlet />
          </LoggedLayout>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/empresas" element={<Enterprises />} />
        <Route path="/empresas/criar" element={<EnterpriseCreateOrEdit />} />
        <Route path="/empresas/:id" element={<EnterpriseCreateOrEdit />} />
        <Route path="/pedidos" element={<Orders />} />
        <Route path="/categorias" element={<Categories />} />
        <Route path="/produtos" element={<Products />} />
        <Route path="/promocoes" element={<Promotions />} />
        <Route path="/usuarios" element={<Users />} />
        <Route path="/clientes" element={<Clients />} />
      </Route>
    </Routes>
  );
};

export default Router;
