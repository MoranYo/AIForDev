import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();
const port = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parser with size limit
app.use(express.json({ limit: '10mb' }));

app.get('/', (_, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});