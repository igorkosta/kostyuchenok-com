import axios from 'axios';
import { randomBytes } from 'crypto';

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

async function deleteFile(path) {
  const sha = await getFileSha(path);
  if (!sha) return;
  
  await axios.delete(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`,
    {
      headers: await getGitHubHeaders(),
      data: {
        message: `Delete: ${path}`,
        sha,
        branch: 'main',
      }
    }
  );
}

const LOCATION_FILE = 'src/data/location.json';

async function saveLocation(location) {
  const data = JSON.stringify({
    latitude: location.latitude,
    longitude: location.longitude,
    updatedAt: new Date().toISOString()
  }, null, 2);
  
  const sha = await getFileSha(LOCATION_FILE);
  await commitFile(
    LOCATION_FILE,
    data,
    'Update location',
    sha
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

function generateId() {
  return randomBytes(3).toString('hex');
}

export default async function handler(req, res) {
  const urlParts = req.url.split('/');
  const idParam = urlParts[urlParts.length - 1];

  if (req.method === 'DELETE' && idParam && idParam !== 'telegram') {
    try {
      const shortFiles = await axios.get(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/${SHORTS_PATH}`,
        { headers: await getGitHubHeaders() }
      );

      for (const file of shortFiles.data) {
        if (!file.name.endsWith('.md')) continue;
        
        const fileContent = await axios.get(
          file.download_url,
          { headers: await getGitHubHeaders() }
        );
        const content = Buffer.from(fileContent.data.content, 'base64').toString('utf-8');
        
        const idMatch = content.match(/id:\s*([a-z0-9]+)/i);
        if (idMatch && idMatch[1] === idParam) {
          const slug = file.name.replace('.md', '');
          await deleteFile(`${SHORTS_PATH}/${file.name}`);
          
          for (const imgFile of shortFiles.data) {
            if (imgFile.name.startsWith(slug) && imgFile.name.includes('-') && !imgFile.name.endsWith('.md')) {
              await deleteFile(`${IMAGES_PATH}/${imgFile.name}`);
            }
          }
          console.log(`Deleted short: ${slug} (id: ${idParam})`);
          return res.status(200).json({ ok: true });
        }
      }
      return res.status(404).json({ error: 'Short not found' });
    } catch (e) {
      console.error('Delete failed:', e.message);
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message || (!message.text && !message.photo && !message.location)) {
    return res.status(400).json({ error: 'No message content' });
  }

  if (message.location) {
    try {
      await saveLocation(message.location);
      await axios.post(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: message.chat.id,
          text: `✅ Location updated: ${message.location.latitude}, ${message.location.longitude}`,
        }
      );
    } catch (e) {
      console.error('Failed to save location:', e.message);
      await axios.post(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: message.chat.id,
          text: `❌ Failed to save location: ${e.message}`,
        }
      );
    }
    return res.status(200).json({ ok: true });
  }

  const chatId = String(message.chat.id);
  // const allowedChats = (process.env.ALLOWED_CHAT_IDS || '').split(',').map(s => s.trim()).filter(Boolean);
  // if (!allowedChats.includes(chatId)) {
  //   return res.status(200).json({ ok: true });
  // }
  console.log('message', message);

  const text = message.text || '';
  
  if (text.startsWith('/delete ')) {
    const shortId = text.replace('/delete ', '').trim();
    try {
      await deleteFile(`${SHORTS_PATH}/${shortId}.md`);
      
      const imageFiles = await axios.get(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/${IMAGES_PATH}`,
        { headers: await getGitHubHeaders() }
      );
      
      const filesToDelete = imageFiles.data.filter(f => f.name.startsWith(shortId));
      
      for (const file of filesToDelete) {
        await deleteFile(`${IMAGES_PATH}/${file.name}`);
      }
      
      await axios.post(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: chatId,
          text: `✅ Deleted short: ${shortId}`,
        }
      );
      return res.status(200).json({ ok: true });
    } catch (e) {
      console.error('Delete failed:', e.message);
      await axios.post(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: chatId,
          text: `❌ Failed to delete short: ${e.message}`,
        }
      );
      return res.status(200).json({ ok: true });
    }
  }

  const timestamp = new Date(message.date * 1000);
  const timestampStr = timestamp.toISOString();

  const mdContent = text;

  const shortId = generateId();

  const imageUrls = [];

  if (message.photo && message.photo.length > 0) {
    const photos = message.photo.sort((a, b) => a.file_size - b.file_size);

    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      const ext = 'jpg';
      const imageFilename = `${shortId}-${i + 1}.${ext}`;

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

  let finalContent = `---\nid: ${shortId}\ndatetime: ${timestampStr}\ntelegram_id: ${message.message_id}\n---\n\n${mdContent}`;
  for (const url of imageUrls) {
    finalContent += `\n\n![image](${url})`;
  }

  const sha = await getFileSha(`${SHORTS_PATH}/${shortId}.md`);
  await commitFile(
    `${SHORTS_PATH}/${shortId}.md`,
    finalContent,
    `Add short: ${shortId}`,
    sha
  );

  await axios.post(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      chat_id: chatId,
      text: `✅ Published to https://kostyuchenok.com/shorts\n\nID: ${shortId}\nDelete: /delete ${shortId}`,
    }
  );

  res.status(200).json({ ok: true });
}
