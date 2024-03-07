const express = require('express');
const bodyParser = require('body-parser');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/appointments', appointmentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
