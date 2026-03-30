import axios from 'axios';

const GITHUB_REPO = 'igorkosta/kostyuchenok-com';
const SHORTS_PATH = 'src/blog/shorts';
const IMAGES_PATH = 'public/shorts';

async function getGitHubHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  };
}

async function getFileSha(path) {
  try {
    const res = await axios.get(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`,
      { headers: await getGitHubHeaders() }
    );
    return res.data.sha;
  } catch (e) {
    if (e.response?.status === 404) return null;
    throw e;
  }
}

async function commitFile(path, content, message, sha = null) {
  const body = {
    message,
    content: Buffer.from(content).toString('base64'),
    branch: 'main',
  };
  if (sha) body.sha = sha;
  console.log('body', body);
  await axios.put(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`,
    body,
    { headers: await getGitHubHeaders() }
  );
}

async function downloadTelegramFile(fileId) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  const fileRes = await axios.get(
    `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`
  );

  const filePath = fileRes.data.result.file_path;
  const fileUrl = `https://api.telegram.org/file/bot${botToken}/${filePath}`;

  const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
  return response.data;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  if (!message || !message.text && !message.photo) {
    return res.status(400).json({ error: 'No message content' });
  }

  const chatId = String(message.chat.id);
  // const allowedChats = (process.env.ALLOWED_CHAT_IDS || '').split(',').map(s => s.trim()).filter(Boolean);
  // if (!allowedChats.includes(chatId)) {
  //   return res.status(200).json({ ok: true });
  // }
  console.log('message', message);
  const timestamp = new Date(message.date * 1000);
  const slug = timestamp.toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const baseFilename = slug;

  const text = message.text || '';
  const mdContent = text;

  const imageUrls = [];

  if (message.photo && message.photo.length > 0) {
    const photos = message.photo.sort((a, b) => a.file_size - b.file_size);

    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      const ext = 'jpg';
      const imageFilename = `${baseFilename}-${i + 1}.${ext}`;

      try {
        const imageData = await downloadTelegramFile(photo.file_id);
        const base64Image = Buffer.from(imageData).toString('base64');

        const sha = await getFileSha(`${IMAGES_PATH}/${imageFilename}`);
        await commitFile(
          `${IMAGES_PATH}/${imageFilename}`,
          base64Image,
          `Add short image: ${imageFilename}`,
          sha
        );

        imageUrls.push(`/shorts/${imageFilename}`);
      } catch (e) {
        console.error('Failed to upload image:', e.message);
      }
    }
  }

  let finalContent = mdContent;
  for (const url of imageUrls) {
    finalContent += `\n\n![image](${url})`;
  }

  const sha = await getFileSha(`${SHORTS_PATH}/${baseFilename}.md`);
  await commitFile(
    `${SHORTS_PATH}/${baseFilename}.md`,
    finalContent,
    `Add short: ${baseFilename}`,
    sha
  );

  await axios.post(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      chat_id: chatId,
      text: `✅ Published to https://kostyuchenok.com/shorts`,
    }
  );

  res.status(200).json({ ok: true });
}
