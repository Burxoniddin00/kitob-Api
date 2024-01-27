import expres from "express";
import { registerRouters } from "./src/routers/register.routes.js";
import "./src/db/mongoos.js";
import { LoginRouters } from "./src/routers/login.routes.js";
const PORT = 8123;
import cors from "cors";
import { userBooksRouters } from "./src/routers/userBooks.routes.js";
import { usersRouters } from "./src/routers/users.routes.js";
import { retingRouters } from "./src/routers/reting.routes.js";
import { adminRouters } from "./src/routers/admin.routes.js";

const app = expres();
app.use(expres.json());
app.use(cors());

app.use("/register", registerRouters);
app.use("/login", LoginRouters);
app.use("/userBooks", userBooksRouters);
app.use("/users", usersRouters);
app.use("/reyting", retingRouters);
app.use('/admin',adminRouters)
app.listen(PORT, console.log("SERVER RUN >>>>>>>"));
