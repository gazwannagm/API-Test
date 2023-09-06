import express, {Express, Request, Response} from 'express'


const app: Express = express();
const port: string = "5555";

interface Transaction {
  code: string;
  amount: number;
  provider: string;
}

interface Merchant{
  id:string
}

interface Secrets{
  merchant_id: string;
  merchant_secret: string;
}

const db : Transaction[] = [];

const secrets_db : Secrets[] = [
  {
    merchant_id : "100",
    merchant_secret: "329847928347923874938247439287"
  },
  {
    merchant_id : "200",
    merchant_secret: "sdlkfjasdol;kfjksldjfhalk;sdjfsdf"
  }
];

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.json({"message": "Hello from cuneicode"});
});

app.post("/init", (req: Request, res: Response) => {
  const transaction = req.body as Transaction
  db.push(transaction);
  res.send();
});

app.get("/init", (req: Request, res: Response)=> {
  res.send(db);
})


app.post("/secrets", (request: Request, response: Response)=> {

  const merchant_id: Merchant = request.body;

  response.send(merchant_id)




})


app.get("/secrets",(request: Request, response: Response)=>{

  const merchant : Merchant = request.body
  const result = secrets_db.find((ele => ele.merchant_id === merchant.id))
  response.send(result);

});

interface Secret {
  id: string;
  secret: string;
}
const secrets : Secret[] = [
  {
    id: "123",
    secret: "129387249874987"
  },
  {
    id: "111",
    secret: "11111111"
  },
  {
    id: "222",
    secret: "22222222"
  },
  {
    id: "333",
    secret: "3333333"
  },
];

app.post("/Test", (request: Request, response: Response) => {
  const id = request.body.id
  response.send(secrets.find(s => s.id === id));
})

app.listen(port);