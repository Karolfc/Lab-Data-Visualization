import { express, cors, dotenv, fs, Server } from './dependencies.js';
import userRoutes from './routes/userRoutes.js';
import dashboardRoutes from './routes/dashboardRouters.js';

dotenv.config();
const PORT = process.env.PORT; //5050
const app = express();

const httpServer = app.listen(PORT, () =>{
    console.table({ 
        "Dashboard app:": `http://localhost:${PORT}/dashboard-app`,
        "Mobile app:": `http://localhost:${PORT}/app` });
})

const io = new Server(httpServer, { path: '/real-time' });

const STATIC_APP = express.static('./static/client-app');
const STATIC_DASHBOARD = express.static('./static/dashboard-app');
app.use(express.json());
app.use('/app', STATIC_APP);
app.use('/dashboard-app', STATIC_DASHBOARD);
app.use('/user', userRoutes);
app.use('/dashboard', dashboardRoutes);

io.on('connection', (socket) => {
    socket.on('real-time-update', (message) => {
        console.log(message);
        socket.broadcast.emit('real-time-update', message)
    });
});

export { io };