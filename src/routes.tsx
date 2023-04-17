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
import CategoryCreateOrEdit from "@containers/CategoryCreateOrEdit";
import ProductCreateOrEdit from "@containers/ProductCreateOrEdit";
import OrderView from "@containers/OrderView";
import ClientCreateOrEdit from "@containers/ClientCreateOrEdit";

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
        <Route path="/empresas/:enterpriseId/pedidos" element={<Orders />} />
        <Route path="/empresas/:id/pedidos/:orderId" element={<OrderView />} />
        <Route path="/empresas/:id/categorias" element={<Categories />} />
        <Route path="/empresas/:id/promocoes" element={<Promotions />} />
        <Route
          path="/empresas/:id/categorias/criar"
          element={<CategoryCreateOrEdit />}
        />
        <Route
          path="/empresas/:id/categorias/:categoryId"
          element={<CategoryCreateOrEdit />}
        />
        <Route
          path="/empresas/:id/categorias/:categoryId/produtos"
          element={<Products />}
        />
        <Route
          path="/empresas/:id/categorias/:categoryId/produtos/criar"
          element={<ProductCreateOrEdit />}
        />
        <Route
          path="/empresas/:id/categorias/:categoryId/produtos/:productId"
          element={<ProductCreateOrEdit />}
        />
        <Route path="/usuarios" element={<Users />} />
        <Route path="/clientes" element={<Clients />} />
        <Route path="/clientes/criar" element={<ClientCreateOrEdit />} />
        <Route path="/clientes/:clientId" element={<ClientCreateOrEdit />} />
        <Route path="/clientes/:clientId/pedidos" element={<Orders />} />
        <Route
          path="/clientes/:clientId/pedidos/:orderId"
          element={<OrderView />}
        />
      </Route>
    </Routes>
  );
};

export default Router;
