import { Config, Context } from "@netlify/functions";

const ALLOWED_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const RESPONSE_INIT = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  status: 200,
};

export default function handler(request: Request, context: Context) {
  const method = ALLOWED_METHODS.find((method) => method === request.method);
  if (method === undefined) return;
  return user[method](request, context);
}

const user: Record<string, Function> = {
  GET: getUser,
  POST: postUser,
  PUT: putUser,
  PATCH: patchUser,
  DELETE: deleteUser,
};

function getUser(request: Request, context: Context): Response {
  const { id } = context.params;
  return new Response(JSON.stringify({ message: `${id} 사용자 정보에 대한 요청` }), RESPONSE_INIT);
}

function postUser(request: Request, context: Context): Response {
  return new Response(JSON.stringify({}), RESPONSE_INIT);
}

function putUser(request: Request, context: Context): Response {
  return new Response(JSON.stringify({}), RESPONSE_INIT);
}

function patchUser(request: Request, context: Context): Response {
  return new Response(JSON.stringify({}), RESPONSE_INIT);
}

function deleteUser(request: Request, context: Context): Response {
  return new Response(JSON.stringify({}), RESPONSE_INIT);
}

export const config: Config = {
  path: ["/user/:id"],
};
