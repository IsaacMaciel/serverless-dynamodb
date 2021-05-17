import { v4 as uuid } from "uuid";
import { document } from "../utils/dynamodbClient";
import { APIGatewayProxyHandler } from "aws-lambda";

interface IRequestTodo {
  title: string;
  done: boolean;
  deadline: Date;
}

export const handle: APIGatewayProxyHandler = async (event) => {
  const { title, done, deadline } = JSON.parse(event.body) as IRequestTodo;
  const id = uuid();
  const { userid } = event.pathParameters;

  const response = await document
    .put({
      TableName: "todos_table",
      Item: {
        id,
        userid,
        title,
        done,
        deadline,
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Criado com sucesso",
    }),
    headers: {
      "Content-type": "application/json",
    },
  };
};
