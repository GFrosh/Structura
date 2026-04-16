const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");
import type { Request, Response } from "express";
import type { ExecException } from "child_process";

const app = express();

const now = () => {
    const date = new Date();
    return date.toLocaleString("en-US", {
        hour12: false,
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

app.use(express.static(path.join(__dirname, "client")));
app.use(cors());
app.use(express.json());

app.post("/generate", (req: Request, res: Response) => {
    const umlText = req.body.uml;

    const id = `diagram-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const pumlFile = path.join(os.tmpdir(), `${id}.puml`);
    const svgFile = path.join(os.tmpdir(), `${id}.svg`);

    fs.writeFileSync(pumlFile, umlText);

    exec(`plantuml -tsvg -o ${os.tmpdir()} ${pumlFile}`, (error: ExecException | null) => {
        if (error) {
            console.error(error);
            fs.rmSync(pumlFile, { force: true });
            return res.status(500).send("Error generating diagram");
        }

        const svg = fs.readFileSync(svgFile, "utf8");

        // Clean up temp files
        fs.rmSync(pumlFile, { force: true });
        fs.rmSync(svgFile, { force: true });

        res.send(svg);
    });
});

app.listen(3000, "0.0.0.0", () => {
    console.log(now(), "Server started at http://localhost:3000");
});

export {};
