const fs = require("fs");
const ejs = require("ejs");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const generator = require("generate-password");
const cookieParser = require("cookie-parser");

const client = new PrismaClient();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
app.use(cookieParser());

app.post("/login", async (request, response) => {
  const template = fs.readFileSync("template.ejs", "utf-8");
  const html = ejs.render(template, { username: request.body.username });
  const password = generator.generate({
    length: 10,
    numbers: true,
  });
  response.cookie("session", password);
});
