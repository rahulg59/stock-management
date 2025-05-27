import express from "express";
import apparelRoutes from "./routes/apparel.routes";
import { setupSwagger } from "./swagger";

const app = express();
app.use(express.json());

app.use("/api/apparel", apparelRoutes);
setupSwagger(app);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));