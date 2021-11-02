import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

/* Toda a rota iniciada com appointments, independente do método, vai chamar
o arquivo appointments routes */
routes.use('/appointments', appointmentsRouter);

export default routes;
