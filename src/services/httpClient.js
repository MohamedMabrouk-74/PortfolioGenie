// عميل HTTP بسيط بيحاكي شكل التعامل مع REST API حقيقي (زي mockapi.io)
// الرابط ده وهمي دلوقتي وهيتستبدل بلينك الـ backend الحقيقي بعدين

export const API_BASE_URL = "https://portfoliogenie-api.mockapi.io/api/v1";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function mockGet(endpoint, resolver, delayMs = 700) {
  console.info(`[mock-api] GET ${API_BASE_URL}${endpoint}`);
  await delay(delayMs);
  return resolver();
}

async function mockPost(endpoint, body, resolver, delayMs = 900) {
  console.info(`[mock-api] POST ${API_BASE_URL}${endpoint}`, body);
  await delay(delayMs);
  return resolver(body);
}

export { mockGet, mockPost };
