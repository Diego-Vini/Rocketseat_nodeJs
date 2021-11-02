import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

// Aqui definimos as rotas com o caminho após o appointments vindo do index.js

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate =
    appointmentsRepository.findByDate(parsedDate);

  if (findAppointmentInSameDate)
    return res
      .status(400)
      .json({ message: 'This appointment is already booked' });

  const appointment = appointmentsRepository.create(provider, parsedDate);

  return res.json(appointment);
});

export default appointmentsRouter;
