"use strict";

const DynamoDb = require("aws-sdk/clients/dynamodb");
const documentClient = new DynamoDb.DocumentClient({ region: "us-east-1" });

module.exports.createNote = async (event, context, cb) => {
  try {
    let data = JSON.parse(event.body);
    const params = {
      TableName: "notes",
      Item: {
        notesId: data.id,
        title: data.title,
        body: data.body,
      },
      ConditionExpression: "attribute_not_exists(notesId)",
    };

    await documentClient.put(params).promise();

    cb(null, {
      statusCode: 201,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    cb(null, {
      statusCode: 500,
      body: JSON.stringify(error.message),
      headers: { "Content-Type": "application/json" },
    });
  }
};

module.exports.updateNote = async (event) => {
  const notesId = event.pathParameters.id;
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "A  Note with id " + notesId + " is Updated !",
    }),
    headers: { "Content-Type": "application/json" },
  };
};
