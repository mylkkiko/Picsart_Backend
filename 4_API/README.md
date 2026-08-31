# Productivity API

A REST API built with Node's `http` module only — no Express, no routing libraries. It handles three separate resources: notes, tasks and contacts. Data is kept in memory, so it resets when the server restarts.

## How to run

```
npm install
node server.js
```

The port comes from `PORT` in `.env` (see `.env.example`), or 4001 if there's no `.env`.

## Endpoints

The same five endpoints exist for `/notes`, `/tasks` and `/contacts`:

- `GET /notes` — list all
- `POST /notes` — create one
- `GET /notes/:id` — get one
- `PUT /notes/:id` — update one (you can send just the fields you want to change)
- `DELETE /notes/:id` — delete one

## How I structured the handlers

I wrote the notes handlers first and then noticed all three resources work the same way — the only differences are which fields they have, which are required, and what the defaults are.

So I put those differences into one object:

```js
const resources = {
    tasks: {
        items: [],
        nextId: 1,
        fields: ['title', 'completed'],
        required: ['title'],
        defaults: { completed: false },
        label: 'Task'
    },
    // notes and contacts look the same
};
```

The router finds the right one with `resources[segment[0]]`, and the handlers use `resource.items`, `resource.required` and so on. That way there's only one set of five handlers instead of three copies.

Creating and updating use loops over these lists instead of hardcoded field names. Looping over the allowed fields also means a client can't overwrite `id` by sending it in the body.

## Status codes

- 200 — successful GET, PUT, DELETE
- 201 — successful POST
- 400 — missing required field, broken JSON, empty body
- 404 — id or route doesn't exist
- 405 — method not supported on that route
- 500 — unexpected error

## Reading the body

Request bodies come in chunks, so `readBody` collects them and calls back on `'end'`, when everything has arrived. `JSON.parse` is wrapped in a `try` so broken JSON returns 400 instead of crashing the server, and a second `try` around the whole handler turns anything unexpected into a 500.