import express from "express";
import vendorRoutes from "./routes/vendor.routes";
import orderRoutes from "./routes/order.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from './swagger/swagger.json';

const app = express();
app.use(express.json());

app.use('/api/vendors', vendorRoutes);
app.use('/api/orders', orderRoutes);


// swagger setup
app.get('/', (_req, res) => {
  res.redirect('/api-docs');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));