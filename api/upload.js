import fs from "fs";
import path from "path";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const { filename, content } = req.body;

    if (!filename || !content) {
        return res.status(400).json({ error: "Dados inválidos" });
    }

    const dir = "/tmp/transcripts";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const filePath = path.join(dir, filename);
    fs.writeFileSync(filePath, content, "utf-8");

    return res.json({
        url: `https://${req.headers.host}/api/view?file=${filename}`
    });
}
