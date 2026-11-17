// Cloudflare Pages Function untuk /api/data
// Perlu: KV namespace dengan nama binding PFC, dan variabel rahasia ADMIN_PASSWORD
// (keduanya diatur di dashboard Cloudflare, bukan di dalam kode).
const J = (body, status = 200, extra = {}) =>
  new Response(body, {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...extra },
  });

export async function onRequest({ request, env }) {
  if (!env.PFC) return J('{"error":"KV binding PFC belum dipasang"}', 500);
  const m = request.method;

  // Publik: membaca rekap data
  if (m === 'GET') {
    const v = await env.PFC.get('data');
    return v ? J(v, 200, { 'cache-control': 'public, max-age=60' }) : J('null');
  }

  // Selain GET: hanya admin
  const ok = env.ADMIN_PASSWORD && request.headers.get('x-admin-password') === env.ADMIN_PASSWORD;
  if (!ok) {
    await new Promise((r) => setTimeout(r, 800)); // memperlambat tebak-tebakan password
    return J('{"error":"unauthorized"}', 401);
  }

  if (m === 'POST') return J('{"ok":true}'); // cek login
  if (m === 'PUT') {
    const t = await request.text();
    if (t.length < 50 || !t.includes('"ids"')) return J('{"error":"data tidak valid"}', 400);
    await env.PFC.put('data', t);
    return J('{"ok":true}');
  }
  if (m === 'DELETE') {
    await env.PFC.delete('data');
    return J('{"ok":true}');
  }
  return J('{"error":"method tidak didukung"}', 405);
}
