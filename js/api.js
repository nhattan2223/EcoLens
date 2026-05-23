// api.js — Gọi dữ liệu qua Supabase Edge Functions (không lộ API key phía client)

function _getSupabaseConfig() {
  const { SUPABASE_URL, SUPABASE_KEY } = window.EcoLensApiKeys || {};
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('[api.js] Thiếu SUPABASE_URL hoặc SUPABASE_KEY trong EcoLensApiKeys');
  }
  return { SUPABASE_URL, SUPABASE_KEY };
}

// ── Hàm dùng chung: gọi Supabase Edge Function ──────────────
async function _callEdgeFn(fnName, options = {}) {
  const { SUPABASE_URL, SUPABASE_KEY } = _getSupabaseConfig();
  const url = `${SUPABASE_URL}/functions/v1/${fnName}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      // Supabase yêu cầu anon key để xác thực Edge Function
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`[${fnName}] HTTP ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

// ── getCurrentWeather ────────────────────────────────────────
// Gọi Edge Function get-weather với type="weather"
export async function getCurrentWeather(lat, lon) {
  try {
    const data = await _callEdgeFn('get-weather', {
      method: 'POST',
      body: JSON.stringify({ lat, lon, type: 'weather' }),
    });

    if (!data.main) {
      console.warn('[getCurrentWeather] Phản hồi không hợp lệ:', data);
      return null;
    }

    return {
      temp:     data.main.temp,
      cityName: data.name,
    };
  } catch (err) {
    console.error('[getCurrentWeather] Lỗi:', err);
    return null;
  }
}

// ── getAirPollution ──────────────────────────────────────────
// Gọi Edge Function get-weather với type="pollution"
export async function getAirPollution(lat, lon) {
  try {
    const data = await _callEdgeFn('get-weather', {
      method: 'POST',
      body: JSON.stringify({ lat, lon, type: 'pollution' }),
    });

    if (!data.list || !data.list[0]) {
      console.warn('[getAirPollution] Phản hồi không hợp lệ:', data);
      return null;
    }

    const p = data.list[0];
    return {
      aqi:   p.main.aqi,
      pm2_5: p.components.pm2_5,
    };
  } catch (err) {
    console.error('[getAirPollution] Lỗi:', err);
    return null;
  }
}

// ── getEnvironmentNews ───────────────────────────────────────
// Gọi Edge Function get-news (GET request)
export async function getEnvironmentNews() {
  try {
    const data = await _callEdgeFn('get-news', {
      method: 'GET',
    });

    if (data.errors) {
      console.warn('[getEnvironmentNews] GNews trả lỗi:', data.errors);
      return [];
    }

    return data.articles || [];
  } catch (err) {
    console.error('[getEnvironmentNews] Lỗi:', err);
    return [];
  }
}