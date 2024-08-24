
// kakao
const K_REST_API_KEY = '백엔드한테 달라하자1';
const K_REDIRECT_URI = "/oauth2/authorization/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;
