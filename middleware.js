export async function middleware(request) {
  const { pathname } = new URL(request.url);

  const trackedFiles = ['/cv.pdf', '/erste.pdf'];

  if (trackedFiles.includes(pathname)) {
    const filename = pathname.replace('/', '');
    const referrer = request.headers.get('referer') || 'Direct access';
    const timestamp = new Date().toISOString();

    const message = `📄 PDF Accessed: ${filename}\n⏰ Time: ${timestamp}\n🔗 Referrer: ${referrer}`;

    fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
      }),
    }).catch(console.error);
  }

  return new Response(null, { status: 200 });
}

export const config = {
  matcher: ['/cv.pdf', '/erste.pdf'],
};
