// ======================================
// SHA-256 Hash Generator
// ======================================

async function sha256(text) {

    const encoder = new TextEncoder();

    const data = encoder.encode(text);

    const hash = await crypto.subtle.digest("SHA-256", data);

    const bytes = Array.from(new Uint8Array(hash));

    return bytes
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");

}
