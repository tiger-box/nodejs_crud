const http = require("http");
const url = require("url");

let users = [];
let currentId = 1;

//функция для обработки запроса
const requestHandler = (req, res) => {
	const parsedUrl = url.parse(req.url, true);
	const method = req.method;
	const path = parsedUrl.pathname;

	//установка заголовков ответа
	res.setHeader("Content-type", "application/json");

	if (path === "/users" && method == "GET") {
		res.writeHead(200);
		res.end(JSON.stringify(users));
	} else if (path === "/users" && method === "POST") {
		let body = "";

		req.on("data", chunk => {
			body += chunk;
		});

		req.on("end", () => {
			const user = JSON.parse(body);
			user.id = currentId++;
			users.push(user);
			res.writeHead(201);
			res.end(JSON.stringify(user));
		});
	} else if (path.startsWith("/users/") && method === "GET") {
		const id = parseInt(path.split("/")[2]);
		const user = users.find((u) => u.id === id);

		if (user) {
			res.writeHead(200);
			res.end(JSON.stringify(user));
		} else {
			res.writeHead(404);
			res.end(JSON.stringify({ message: "User not found" }));
		}
	} else if (path.startsWith("/users/") && method === "PUT") {
		let body = "";
		const id = parseInt(path.split("/")[2]);

		req.on("data", (chunk) => {
			body += chunk;
		});

		req.on("end", () => {
			const updatedData = JSON.parse(body);
			const userIndex = users.findIndex((u) => u.id === id);

			if (userIndex !== -1) {
				users[userIndex] = { ...users[userIndex], ...updatedData };
				res.writeHead(200);
				res.end(JSON.stringify(users[userIndex]));
			} else {
				res.writeHead(404);
				res.end(JSON.stringify({ message: "User not found" }));
			}
		});
	} else if (path.startsWith("/users/") && method == "DELETE") {
		const id = parseInt(path.split("/")[2]);
		const userIndex = users.findIndex((u) => u.id === id);
		
		if (userIndex !== -1) {
			users.splice(userIndex, 1);
			res.writeHead(204);
			res.end();
		} else {
			res.writeHead(404);
			res.end(JSON.stringify({ message: "User not found" }));
		}
	} else {
		// не поддерживаемый  маршрут
		res.writeHead(404);
		res.end(JSON.stringify({ message: "Route not found" }));
	}
};

// создание HTPP сервера
const server = http.createServer(requestHandler);

// запуск  сервера на порту 3000
const PORT = 3000;
server.listen(PORT, () => {
	console.log(`Server is  running on port ${PORT}`);
});
