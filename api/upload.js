import { put } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { filename, content } = req.body;

  if (!filename || !content) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  const blob = await put(filename, content, {
    access: "public",
    contentType: "text/html; charset=utf-8"
  });

  return res.status(200).json({ url: blob.url });
}
