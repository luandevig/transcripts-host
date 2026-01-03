import fs from "fs";
import path from "path";

export default function handler(req, res) {
    const { file } = req.query;
    const filePath = path.join("/tmp/transcripts", file);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send("Transcript não encontrado");
    }

    res.setHeader("Content-Type", "text/html");
    res.send(fs.readFileSync(filePath, "utf-8"));
}
