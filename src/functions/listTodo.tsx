import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { userid } = event.pathParameters;

  const resp = await document
    .query({
      TableName: "todos_table",
      KeyConditionExpression: "userid = :userid",
      ExpressionAttributeValues: {
        ":userid": userid,
      },
    })
    .promise();

  console.log(resp);

  return {
    statusCode: 200,
    body: JSON.stringify({
      tasks: resp.Items,
    }),
    headers: {
      "Content-type": "application/json",
    },
  };
};
