// Safe fetch wrapper — prevents crashes when API is down
export async function safeFetch(url: string, options: RequestInit = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("⚠️ safeFetch fallback triggered:", err);
    return null;
  }
}
