import axios from "axios";
import ls from '@/helpers/storage';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default {
  getMangas(page: number, pagesize: number, styles: string) {
    return apiClient.get("ClassPage", { params: { page_num: page, page_size: pagesize, styles: styles, fullAccess: ls.get('isAdult') ? 1 : 0 } });
  },
  getGenreLists(l: number = 10) {
    return apiClient.get("AllLabel", { params: { limit: l } });
  },
  getSixMangas(pid: number, pageNum: number, isRandom: number) {
    return apiClient.get("GetClassPageSixComics", { params: { id: pid, page: pageNum, rand: isRandom, fullAccess: ls.get('isAdult') ? 1 : 0 } });
  },
  getSingleManga(url: string) {
    return apiClient.get("ComicDetail", { params: { slug: url } });
  },
  getArticle(url: string) {
    return apiClient.get("ArticleDetail", { params: { slug: url } });
  },
  growUp() {
    return apiClient.get("IAmAllGrownUp");
  },
  getChapterImages(id: string, slug: string) {
    return apiClient.get("GetImageIndex", { params: { chapter_id: id, slug: slug } });
  },
  getRecommends() {
    return apiClient.get("Recommend");
  },
  getBanners(limit: number) {
    return apiClient.get("GetClassPageHomeBanner", { params: { limit: limit } });
  },
  getPosts(limit: number) {
    return apiClient.get("GetClassPagePosts", { params: { limit: limit } });
  },
  searchQuery(query: string, limit: number) {
    return apiClient.get("SearchSug", { params: { query: query, limit: limit } });
  },
  listHistory(history: string[]) {
    return apiClient.get("ListHistory", { params: { history: JSON.stringify(history) } });
  },
  listStore(category: number) {
    return apiClient.get("ListStore", { params: { category: category } });
  },
  doBookmark(token: string, bookmark: number, toon: number) {
    return apiClient.post("DoBookmark", { token: token, bookmark: bookmark, toon: toon });
  },
  doHistory(token: string, history: number, toon: number) {
    return apiClient.post("DoHistory", { token: token, history: history, toon: toon });
  },
  doHcaptcha(token: string, token2: string) {
    return apiClient.post("InfiniteMoneyHackIRL", { token: token, token2: token2 });
  },
  signUpAuth(username: string, email: string, password: string, token: string) {
    return apiClient.post("SignUp", { username: username, email: email, password: password, token: token });
  },
  loginAuth(username: string, password: string) {
    const loginRequester = axios.create({
      baseURL: `${import.meta.env.VITE_WORDPRESS_URL}/wp-json/jwt-auth/v1/`,
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });
    return loginRequester.post("token", { username: username, password: password });
  },
  userInfo(jwt: string) {
    const loginRequester = axios.create({
      baseURL: `${import.meta.env.VITE_WORDPRESS_URL}/wp-json/wp/v2/users/`,
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${jwt}`
      },
      timeout: 10000,
    });
    return loginRequester.get("me");
  },
};