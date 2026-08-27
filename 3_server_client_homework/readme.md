# TCP Chat

A chat app built with Node's `net` module. Several people can connect from different terminals, choose a username, write to everyone, or send a private message.

## How to run

```
npm install
node server.js
```

Then open another terminal for each user:

```
node client.js
```

It will ask for a username. It can't be empty and it can't be one that someone else is already using.

## Protocol

Every message ends with `\n`.

The function that does this is in `protocol.js`, and both the server and the client use it.

If a message starts with `/`, it's a command. Otherwise it's sent to everyone except the person who wrote it.

## Commands

- `/msg <username> <text>` — private message to one person
- `/who` — see who's online
- `/quit` — leave the chat

## Extra features

I did four:

1. `/who` — the server keeps all usernames in a `Map`, so it just sends the list back.
2. Join and leave messages — everyone else sees `*** alice joined ***` and `*** alice left ***`. The leave part is in the socket's `close` handler, so it works whether someone types `/quit` or just closes the terminal.
3. `/quit` — closes the connection properly instead of killing the terminal.
4. Chat log — all public messages get written to `chat.log` with the time. Private messages aren't logged.

## Files

- `server.js` — the server
- `client.js` — the client
- `protocol.js` — the function that splits messages

The port is in `.env` (there's an `.env.example`). If there's no `.env`, it uses 3000.