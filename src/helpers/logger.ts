export default (fnc: string, status: 'error' | 'info', msg: string | Error) => {
  const date = new Date().toISOString();
  let message: string;
  if (msg instanceof Error) {
    message = msg.message;
  } else {
    message = msg;
  }
  console.log(`[${date}] [${status.toUpperCase()}] [${fnc}] ${message}`);
};
