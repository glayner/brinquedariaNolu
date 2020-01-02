import { Router } from 'express';

import UserController from './app/controllers/UserController';
import ProductController from './app/controllers/ProductController';
import PurchaseController from './app/controllers/PurchaseController';

import validateUser from './app/validators/UserValidation';
import validateProduct from './app/validators/ProductValidation';
import validatePurchase from './app/validators/PurchaseValidation';

const routes = new Router();

routes.post('/users', validateUser, UserController.store);
routes.get('/users', UserController.index);
routes.put('/users/:id', validateUser, UserController.update);
routes.delete('/users/:id', UserController.delete);
routes.get('/user/:id/purchases', UserController.show);

routes.post('/products', validateProduct, ProductController.store);
routes.get('/products', ProductController.index);
routes.put('/products/:id', validateProduct, ProductController.update);
routes.delete('/products/:id', ProductController.delete);

routes.post('/purchases', validatePurchase, PurchaseController.store);
routes.get('/purchases', PurchaseController.index);
routes.put('/purchases/:id', validatePurchase, PurchaseController.update);
routes.delete('/purchases/:id', PurchaseController.delete);

export default routes;
