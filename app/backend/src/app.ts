import * as express from 'express';
import teamsRoutes from './routes/teams.routes';
import loginRouter from './routes/login.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    // this.setupRoutes();

    // Não remover essa rota
    this.app.get('/', (_req, res) => res.json({ ok: true }));
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use('/teams', teamsRoutes);
    this.app.use('/login', loginRouter);
  }

  // private setupRoutes(): void {
  //   this.app.use('/teams', teamsRoutes);
  // }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
