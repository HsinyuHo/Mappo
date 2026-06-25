import { UserProfile, Post, Comment } from './types';

export const initialUserProfile: UserProfile = {
  username: 'xiaoming',
  displayName: '旅人小明',
  bio: '熱愛在城市的巷弄中尋找驚喜，收集每一個閃閃發光的瞬間。目前正在規劃下一場關於森林與星空的冒險！🌲✨',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWcFuLbYExlgRZEt4IdxbI4lsznFl_cuhrtG-AZLXk63xkQweYecb0Pn84zg-00muMlp5FM_276vXvGcbBa41DjiAK9vajYxYmzLCzJ4eoI66C25OVcVbVUsE31Bi1NyaHC2eEvAmQE8xHDgKg7X0uJLKRwGCwYmRMI9n7-qM5DGuHu5B8wH8McyhG3Kh5c_gLAdTYo_aItrxqE1URsx6s0VxM_oFwAuzHLTwAVxuFkQBvMv6Vg0RrS3r6qIRbP-6WwRq1KmN6VQ',
  tag: '#世界探索者'
};

export const presetAvatars = [
  {
    name: '冒險少年',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWcFuLbYExlgRZEt4IdxbI4lsznFl_cuhrtG-AZLXk63xkQweYecb0Pn84zg-00muMlp5FM_276vXvGcbBa41DjiAK9vajYxYmzLCzJ4eoI66C25OVcVbVUsE31Bi1NyaHC2eEvAmQE8xHDgKg7X0uJLKRwGCwYmRMI9n7-qM5DGuHu5B8wH8McyhG3Kh5c_gLAdTYo_aItrxqE1URsx6s0VxM_oFwAuzHLTwAVxuFkQBvMv6Vg0RrS3r6qIRbP-6WwRq1KmN6VQ'
  },
  {
    name: '耳機背包客',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXBhn1-eCiqOSGoT1DGvCSikVioe4s_hfLT5C2PM8TLEI_8qBIbXbWxjdHRO2nivE1ARki86GtX5Sdr37EOXlmNUpUxCDsC6UVahLOuQ0h_asZ4IKdS8MWrnmFHCL9rx_B0-EH03VaUB7T_Ls3iYMAabiG1_Ioa_TieUNWggqXrH5BslLPqKU17iFE1HJalqqL8lRFBEDIa6Kh9dn9SZEWsAEoPJlxAq1qTivrucmoNy_wyjLRT-7ZmXvusVHb1wLwq3UJ4LZMDg'
  },
  {
    name: '復古攝影師',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwvmxoMXiojNjzmhCGKQHTf66ME6sDDPPiYg0k0BND9ifrsDHiO2nmK_k-vO-9d-C3CjeLrC63-27K4ZXRulfBevmkD40p227FD__csJUDUoqLrfe2LaSQPfDqTntG3fYwWmcfoGv39cpBbEOVEFNEB8LKZqjWeOz45Sg1_ffBgYrSDYq8buZXdR9FHTkJhLsDg7Bde7RrkqpmHJXjH9ZNmjKwGFMIOWZrziaqpN5Q6jBNcJZjyIXM6lcJE8w-QxRGiUQPDs4jJQ'
  },
  {
    name: '喵星愛好者',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8UITYZuJet9K1zSa3pvTa0UVPVSl5dnivntl-QZZWU9EuyHafuz74SxxBmE513nf_J20ibgGP_0uUdBxX5qfbawVEH-UWcOK0Ulok-RtKm5NhM_NXYSRASb7qqMnkx1prifgWtdRBon5jgFBAhp852Q0k-8_y4bzZaYcXe07r1Pt3spCQTy9hAoLdnf0KYBafsmi1y0g8khBZdoWf5KNacMCl4Rkn8k5PKN3uQpwrg9qzqP6JIeuFZ4-yw7hqwlYPP5vGkYOigw'
  }
];

export const initialPosts: Post[] = [
  // --- EAST (東部) ---
  {
    id: 'east-1',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBseox8erinT8qjwmQ3rTJx4HTZooLsPJ1BdMk7fLt1cSAqsP3FDhs9E7UolvUqSXvxlNlj5dFZ8o32KSIj77LhRrS0XYuWmHUh1sZfhq0NoQpI78abU2JJfMMAt0lAvOdJ0QoQqS-hOu1uwob-DOC5U3i5HC8i9ZTjERLpSiVlP2AaBahnzjqvQvQhOt1fVLgwn99UPghJWRTd2vFrZhDYkOjCYF136dssbhwGUx4PvQlxhNHBPA2mdihvdkKm2wEY3-fQnc8f5g',
    caption: '太魯閣峽谷壯麗美景，大自然的鬼斧神工！⛰️',
    alt: 'Taroko Gorge in Eastern Taiwan',
    date: '2026-06-20',
    region: 'east',
    author: { name: 'Mappo 官方', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoKdY8AbKnVFyLcOm-h0oElmQX0jqiY1iyFG63OAySAme6u7yefNsMFTilTQCZAamQHcjQFlMbMNlKjlL3ukElG1wSzj8jZcw3soklfAkHuahMEaE9SwuLgBVPnxXWgyze_xHOEVHym6fLHlpW5NBhVNkVlLzQ5ruk4PlLnjGH74z-KkmZT4KmH8EqJskNrkR9kYQe1hBYzsE1lvDJRDJtfcaA88UUgpxINc0Kqw4a_53-ncgLYlPshEEfwsIdsZn6n4j4IMkYkA' },
    tags: ['太魯閣', '大自然'],
    style: 'circle',
    tilt: -3,
    position: { top: '12%', left: '12%' },
    washiTapeColor: 'rgba(165, 201, 255, 0.4)'
  },
  {
    id: 'east-2',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDStCh0rVylKG4K-08bv8ur8RBp8HoVU4bgO2i8n9M-PBCkHei3syfNkzeG4afWs1uwN0oe8XsuUn9yWMPXnIaxmJa443j7Hu4XkA37A8vr3l369LYfAzFw_QtrZFS-ggQWqqvE3nlx2OfWonJrpD66b0Q_DXEag-9kAp-Bf2kdVvLYlv-jm-NFDCXTY1WYbdsZuWNms6kbXn4ny80jFBmGJTEqFGdgprij00atHEIOhdGa9n5g_nZd03HSDFVR_YrtnBcIPxUiyw',
    caption: '七星潭的鵝卵石灘與漸層蔚藍海岸，海浪聲太療癒了🌊',
    alt: 'Qixingtan Beach in Hualien',
    date: '2026-06-21',
    region: 'east',
    author: { name: 'Mappo 官方', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoKdY8AbKnVFyLcOm-h0oElmQX0jqiY1iyFG63OAySAme6u7yefNsMFTilTQCZAamQHcjQFlMbMNlKjlL3ukElG1wSzj8jZcw3soklfAkHuahMEaE9SwuLgBVPnxXWgyze_xHOEVHym6fLHlpW5NBhVNkVlLzQ5ruk4PlLnjGH74z-KkmZT4KmH8EqJskNrkR9kYQe1hBYzsE1lvDJRDJtfcaA88UUgpxINc0Kqw4a_53-ncgLYlPshEEfwsIdsZn6n4j4IMkYkA' },
    tags: ['七星潭', '看海'],
    style: 'circle',
    tilt: 4,
    position: { top: '38%', left: '46%' },
    washiTapeColor: 'rgba(212, 227, 255, 0.6)'
  },
  {
    id: 'east-3',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByLEPLXeK8azxtqCEsvQN1tfxFDYDV4XgrQU-6K07Sg_MGmhmhVwU7PyFrl4BNPPM4bxwUSsqdxahFKQLIAerF2KtHNoHKFZP3S1f4lADzKJfwG-jfEvK6GfE5yA11wRQkRrFaJdUdtuHO6n_jn65MbWNkjKv7pS_9Sqk5gPflBoRp4Ue5LyPEU7D4nqh1MUfWfRIWuuN8s3JLQUUMHcfKVcA20ebri7AZ-qIwBX4-HbClLEaZRTNgsEteHu1rRdeELEeRoYlbIg',
    caption: '台東池上伯朗大道黃金稻浪！騎著單車好愜意🌾🚲',
    alt: 'Golden rice fields in Chishang, Taitung',
    date: '2026-06-22',
    region: 'east',
    author: { name: 'Mappo 官方', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoKdY8AbKnVFyLcOm-h0oElmQX0jqiY1iyFG63OAySAme6u7yefNsMFTilTQCZAamQHcjQFlMbMNlKjlL3ukElG1wSzj8jZcw3soklfAkHuahMEaE9SwuLgBVPnxXWgyze_xHOEVHym6fLHlpW5NBhVNkVlLzQ5ruk4PlLnjGH74z-KkmZT4KmH8EqJskNrkR9kYQe1hBYzsE1lvDJRDJtfcaA88UUgpxINc0Kqw4a_53-ncgLYlPshEEfwsIdsZn6n4j4IMkYkA' },
    tags: ['池上', '稻浪'],
    style: 'circle',
    tilt: -1.5,
    position: { top: '62%', left: '20%' },
    washiTapeColor: 'rgba(239, 189, 151, 0.6)'
  },

  // --- ISLANDS (離島) ---
  {
    id: 'islands-1',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC00yKbRTXDDj2cjDAeuUF2OON7dwhBYT1jKJjEvJ2c6pPbvQ_RYaJh9Td8mvj6cssjBSN1NQveVevfhlOENWBgGxHESIPtSfLkuWspz3B0bBZwwASKIBydlPjsdGpOp0d-vsFMe1Bm-uVZJLkQ3uTVml85sCJGXCztQ5xoATR-KXWzKwPCYhyHvbNcl51XrhidRpjVGaEDms1YIVw3PSBqIzMCtFd7vROwUH62eGD7mE2Od4eLZ7RU3AbkeBoY9rJnsMv30cGv6Q',
    caption: '隱秘的熱帶海灣，沙灘細軟、海水清澈見底🌴☀️',
    alt: 'Tropical island cove',
    date: '2026-06-18',
    region: 'islands',
    author: { name: 'Mappo 官方', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoKdY8AbKnVFyLcOm-h0oElmQX0jqiY1iyFG63OAySAme6u7yefNsMFTilTQCZAamQHcjQFlMbMNlKjlL3ukElG1wSzj8jZcw3soklfAkHuahMEaE9SwuLgBVPnxXWgyze_xHOEVHym6fLHlpW5NBhVNkVlLzQ5ruk4PlLnjGH74z-KkmZT4KmH8EqJskNrkR9kYQe1hBYzsE1lvDJRDJtfcaA88UUgpxINc0Kqw4a_53-ncgLYlPshEEfwsIdsZn6n4j4IMkYkA' },
    tags: ['秘境', '海灘'],
    style: 'circle',
    tilt: -2,
    position: { top: '10%', left: '8%' },
    washiTapeColor: 'rgba(165, 201, 255, 0.4)'
  },
  {
    id: 'islands-2',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP4Gcqho9WMshouzm6Hh5bAkYzAAI4zHGLBrBcanCN-P7wfM0dmjRkLbc7pnk1uF9JnwxPIUxO5jNHouFcdL-LqCt1oqW1kIE3GIob_VlwUtRozRaoxkxiiQGfX4ApakWXkphP_kzrZwOKcDNF4-6uvF4TM3LWnX6A1ipnRUXkCgfsod4iPaQJpgGkX8Sh2xsEtlSKEao86YwKSfK08FvrCqHKuUQdoSR7OcPpJ5c1BP01QReanLAIYYmeC5CWchqpRsE_momK5w',
    caption: '滿滿的熱帶水果派對，仙人掌冰與芒果甜入心坎！🍧',
    alt: 'Tropical fruit party sticker',
    date: '2026-06-19',
    region: 'islands',
    author: { name: 'Mappo 官方', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoKdY8AbKnVFyLcOm-h0oElmQX0jqiY1iyFG63OAySAme6u7yefNsMFTilTQCZAamQHcjQFlMbMNlKjlL3ukElG1wSzj8jZcw3soklfAkHuahMEaE9SwuLgBVPnxXWgyze_xHOEVHym6fLHlpW5NBhVNkVlLzQ5ruk4PlLnjGH74z-KkmZT4KmH8EqJskNrkR9kYQe1hBYzsE1lvDJRDJtfcaA88UUgpxINc0Kqw4a_53-ncgLYlPshEEfwsIdsZn6n4j4IMkYkA' },
    tags: ['水果派對', '仙人掌冰'],
    style: 'organic',
    tilt: 3,
    position: { top: '22%', left: '50%' },
    washiTapeColor: 'rgba(217, 181, 255, 0.4)'
  },
  {
    id: 'islands-3',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD257i5Ee73Ku5HVm2wErAZ4lOv0xsF5uw2aKX3gvDnxsJ8TycTJBq4lgKhg8xybXpasCWi5bav7sqlwAgoGD281Wewc2NkjZ_97nSZISahss29yB5FcyffVaDKJ6pZv0RiwybBmF103oH7d9JRN0uGipnQzw6tZX4W3hcGPvqVk_3tMZD7P3u7XWCnZ8VRhfBI-u8_skOkId1avSmgmpoU8Gv6xmEZP_CUYAx8BHYAYkaX7hfNCltK-35UWfMB-GCPrRx1k6qmag',
    caption: '登上離島高處，遠眺群島環抱的壯麗海景，一望無際。🌊',
    alt: 'Breathtaking ocean views',
    date: '2026-06-20',
    region: 'islands',
    author: { name: 'Mappo 官方', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoKdY8AbKnVFyLcOm-h0oElmQX0jqiY1iyFG63OAySAme6u7yefNsMFTilTQCZAamQHcjQFlMbMNlKjlL3ukElG1wSzj8jZcw3soklfAkHuahMEaE9SwuLgBVPnxXWgyze_xHOEVHym6fLHlpW5NBhVNkVlLzQ5ruk4PlLnjGH74z-KkmZT4KmH8EqJskNrkR9kYQe1hBYzsE1lvDJRDJtfcaA88UUgpxINc0Kqw4a_53-ncgLYlPshEEfwsIdsZn6n4j4IMkYkA' },
    tags: ['登高', '海景'],
    style: 'circle',
    tilt: 1,
    position: { top: '50%', left: '26%' },
    washiTapeColor: 'rgba(165, 201, 255, 0.5)'
  },
  {
    id: 'islands-4',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4iO5kSYh6Bc_kFJLEVl_XVCqrXyu5PigXZzKLRyMSQhOxJqmQcXbQkFYIZcr83LLEmmaI2Wpl9egO_HkB-5JtgxOOQovIpBiAtYSVXjhInRgpNlmD7n_VDsTweu-hrhhlHI57eBmR3g8Aag-m3yfHxsukILipcorj_tCFZ-eDvdznpZ4MOEzDCSYGivbK_y6S3BOUlxudVn3HSI2pS3BFVvcyDqOsxyJXre7WYLMc2hI178P75hzhSqKIZCI_i_qGy5lBvVwGyQ',
    caption: '小海龜爬向星空下的大海🐢✨，太可愛了！',
    alt: 'Little sea turtle under starlight',
    date: '2026-06-21',
    region: 'islands',
    author: { name: 'Mappo 官方', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoKdY8AbKnVFyLcOm-h0oElmQX0jqiY1iyFG63OAySAme6u7yefNsMFTilTQCZAamQHcjQFlMbMNlKjlL3ukElG1wSzj8jZcw3soklfAkHuahMEaE9SwuLgBVPnxXWgyze_xHOEVHym6fLHlpW5NBhVNkVlLzQ5ruk4PlLnjGH74z-KkmZT4KmH8EqJskNrkR9kYQe1hBYzsE1lvDJRDJtfcaA88UUgpxINc0Kqw4a_53-ncgLYlPshEEfwsIdsZn6n4j4IMkYkA' },
    tags: ['海龜', '夜空'],
    style: 'circle',
    tilt: -5,
    position: { top: '48%', left: '5%' },
    washiTapeColor: 'rgba(239, 189, 151, 0.4)'
  },

  // --- SOUTH (南部) ---
  {
    id: 'south-1',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1HbBBEaHArkeLlpdAVCQ-rTmx2iNJmUzn62gF84g1L0AnnQ_HBrdH0zQEwK7jlrW-UNkLgFRZkEx3gh2jyD4jgWe-Kt5X07M52JgDursYOO95aVBu02Yfo8Sh-LFNpjT7x4jhgsyrz0nkw4SowQhA8S_8a1TMrmTVcJ-IVb1y-t9A8v-BcpHRH6yR5vVvrikLQf14qDsgKo04vfb800HmE7A6HEdoUJpR665oSBHc3a7m292XfP3YUQ2mLKNJ-Mkar_zT4hQi-Q',
    caption: '高雄港的溫柔夕陽，晚霞如薰衣草般浪漫絢爛。🌉',
    alt: 'Kaohsiung Harbor sunset',
    date: '2026-06-22',
    region: 'south',
    author: { name: 'Mappo 官方', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoKdY8AbKnVFyLcOm-h0oElmQX0jqiY1iyFG63OAySAme6u7yefNsMFTilTQCZAamQHcjQFlMbMNlKjlL3ukElG1wSzj8jZcw3soklfAkHuahMEaE9SwuLgBVPnxXWgyze_xHOEVHym6fLHlpW5NBhVNkVlLzQ5ruk4PlLnjGH74z-KkmZT4KmH8EqJskNrkR9kYQe1hBYzsE1lvDJRDJtfcaA88UUgpxINc0Kqw4a_53-ncgLYlPshEEfwsIdsZn6n4j4IMkYkA' },
    tags: ['高雄港', '夕陽'],
    style: 'polaroid',
    tilt: -1.5,
    position: { top: '10%', left: '15%' },
    washiTapeColor: 'rgba(239, 189, 151, 0.6)'
  },
  {
    id: 'south-2',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBq2BNa0GFywIKemrQ-Ic5UbG0JnMlPwXdx_I24RZ0QHlLY3TK4PadizxJE6MjzTn1SZawjAubJxB2r6VZ3CGMz_piHlrWgniKWQNtd3d1XTTuXADQZak-ihIlWvp7sv9jU2hf24bLwZ1pmIsh3GuErIjPchjNrGUPj-ey-X5dnN6D5BNbxA6O6u9bYGPAOwUhfCHqGYUoDu43vB1Ubmc89QmvJbT6Q5DR5c07NYMvdOtKvPFDsfytoiJmdZ9aTUR7OfvL_lnkxhQ',
    caption: '一碗台南現燙牛肉湯！湯頭甘甜、肉質軟嫩，極致享受！🍲',
    alt: 'Tainan beef soup',
    date: '2026-06-23',
    region: 'south',
    author: { name: 'Mappo 官方', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoKdY8AbKnVFyLcOm-h0oElmQX0jqiY1iyFG63OAySAme6u7yefNsMFTilTQCZAamQHcjQFlMbMNlKjlL3ukElG1wSzj8jZcw3soklfAkHuahMEaE9SwuLgBVPnxXWgyze_xHOEVHym6fLHlpW5NBhVNkVlLzQ5ruk4PlLnjGH74z-KkmZT4KmH8EqJskNrkR9kYQe1hBYzsE1lvDJRDJtfcaA88UUgpxINc0Kqw4a_53-ncgLYlPshEEfwsIdsZn6n4j4IMkYkA' },
    tags: ['台南美食', '牛肉湯'],
    style: 'polaroid',
    tilt: 2,
    position: { top: '44%', left: '42%' },
    washiTapeColor: 'rgba(165, 201, 255, 0.5)'
  },
  {
    id: 'south-3',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOH5q6JoDxcfRIq7RL8-01w_wKYBp8qQhUt-rmUz7G2RuPG4A2sefAvLyqyysPHz17eJdqftQ3KHvIrm2BIgBquFSv4l8uNU4iq9QLlejYa4Fgm34z50VN3FMxNURfNeV6en3axhGNAB0YsLn6g9OI6f6MmIjY5CtdLvddJzSJagxhWqAA_WpLnShLnPn8scDMabDNcgqCnaYXKHKpZy6ZDJsJyMzFHoaeoZlqavLDD4QY_o8Sy5Ifk4RLmI5O8t5jennbTXMEug',
    caption: '墾丁的蔚藍晴空與白沙灘，波光粼粼的南國風情🌊☀️',
    alt: 'Kenting beach in Pingtung',
    date: '2026-06-24',
    region: 'south',
    author: { name: 'Mappo 官方', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoKdY8AbKnVFyLcOm-h0oElmQX0jqiY1iyFG63OAySAme6u7yefNsMFTilTQCZAamQHcjQFlMbMNlKjlL3ukElG1wSzj8jZcw3soklfAkHuahMEaE9SwuLgBVPnxXWgyze_xHOEVHym6fLHlpW5NBhVNkVlLzQ5ruk4PlLnjGH74z-KkmZT4KmH8EqJskNrkR9kYQe1hBYzsE1lvDJRDJtfcaA88UUgpxINc0Kqw4a_53-ncgLYlPshEEfwsIdsZn6n4j4IMkYkA' },
    tags: ['墾丁', '海風'],
    style: 'circle',
    tilt: -1,
    position: { top: '65%', left: '16%' },
    washiTapeColor: 'rgba(217, 181, 255, 0.4)'
  },

  // --- NORTH (北部) ---
  {
    id: 'north-1',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
    caption: '雨天午後在台北街角，品一杯醇香拉花的抹茶拿鐵與手沖咖啡。☕',
    alt: 'Matcha latte and drip coffee in Taipei',
    date: '2026-06-23',
    region: 'north',
    author: { name: 'Mappo 官方', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoKdY8AbKnVFyLcOm-h0oElmQX0jqiY1iyFG63OAySAme6u7yefNsMFTilTQCZAamQHcjQFlMbMNlKjlL3ukElG1wSzj8jZcw3soklfAkHuahMEaE9SwuLgBVPnxXWgyze_xHOEVHym6fLHlpW5NBhVNkVlLzQ5ruk4PlLnjGH74z-KkmZT4KmH8EqJskNrkR9kYQe1hBYzsE1lvDJRDJtfcaA88UUgpxINc0Kqw4a_53-ncgLYlPshEEfwsIdsZn6n4j4IMkYkA' },
    tags: ['台北咖啡廳', '放鬆'],
    style: 'circle',
    tilt: -2,
    position: { top: '15%', left: '10%' },
    washiTapeColor: 'rgba(165, 201, 255, 0.4)'
  },
  {
    id: 'north-2',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    caption: '九份老街暖紅的燈籠高掛，熱氣騰騰的草仔粿與阿柑姨芋圓。🏮🍧',
    alt: 'Jiufen Old Street lanterns and food',
    date: '2026-06-24',
    region: 'north',
    author: { name: 'Mappo 官方', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoKdY8AbKnVFyLcOm-h0oElmQX0jqiY1iyFG63OAySAme6u7yefNsMFTilTQCZAamQHcjQFlMbMNlKjlL3ukElG1wSzj8jZcw3soklfAkHuahMEaE9SwuLgBVPnxXWgyze_xHOEVHym6fLHlpW5NBhVNkVlLzQ5ruk4PlLnjGH74z-KkmZT4KmH8EqJskNrkR9kYQe1hBYzsE1lvDJRDJtfcaA88UUgpxINc0Kqw4a_53-ncgLYlPshEEfwsIdsZn6n4j4IMkYkA' },
    tags: ['九份', '老街'],
    style: 'circle',
    tilt: 2,
    position: { top: '24%', left: '46%' },
    washiTapeColor: 'rgba(217, 181, 255, 0.4)'
  },
  {
    id: 'north-3',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80',
    caption: '陽明山擎天崗的綠意山谷，雲霧繚繞，洗滌心靈的漫步綠徑。☁️',
    alt: 'Yingmingshan hiking trail',
    date: '2026-06-24',
    region: 'north',
    author: { name: 'Mappo 官方', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoKdY8AbKnVFyLcOm-h0oElmQX0jqiY1iyFG63OAySAme6u7yefNsMFTilTQCZAamQHcjQFlMbMNlKjlL3ukElG1wSzj8jZcw3soklfAkHuahMEaE9SwuLgBVPnxXWgyze_xHOEVHym6fLHlpW5NBhVNkVlLzQ5ruk4PlLnjGH74z-KkmZT4KmH8EqJskNrkR9kYQe1hBYzsE1lvDJRDJtfcaA88UUgpxINc0Kqw4a_53-ncgLYlPshEEfwsIdsZn6n4j4IMkYkA' },
    tags: ['陽明山', '散步'],
    style: 'circle',
    tilt: -1,
    position: { top: '50%', left: '32%' },
    washiTapeColor: 'rgba(239, 189, 151, 0.5)'
  },

  // --- CENTRAL (中部) ---
  {
    id: 'central-1',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80',
    caption: '日月潭晨曦輕拂，湖面如鏡，一葉扁舟在縹緲雲霧中悠游。🚣‍♀️',
    alt: 'Sun Moon Lake rowing boat at sunrise',
    date: '2026-06-21',
    region: 'central',
    author: { name: 'Mappo 官方', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoKdY8AbKnVFyLcOm-h0oElmQX0jqiY1iyFG63OAySAme6u7yefNsMFTilTQCZAamQHcjQFlMbMNlKjlL3ukElG1wSzj8jZcw3soklfAkHuahMEaE9SwuLgBVPnxXWgyze_xHOEVHym6fLHlpW5NBhVNkVlLzQ5ruk4PlLnjGH74z-KkmZT4KmH8EqJskNrkR9kYQe1hBYzsE1lvDJRDJtfcaA88UUgpxINc0Kqw4a_53-ncgLYlPshEEfwsIdsZn6n4j4IMkYkA' },
    tags: ['日月潭', '日出'],
    style: 'circle',
    tilt: -3,
    position: { top: '16%', left: '12%' },
    washiTapeColor: 'rgba(165, 201, 255, 0.4)'
  },
  {
    id: 'central-2',
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=400&q=80',
    caption: '彩虹眷村童趣繽紛的彩繪牆，黃爺爺親手畫下的夢幻色彩！🌈🎨',
    alt: 'Rainbow Village colourful graffiti',
    date: '2026-06-22',
    region: 'central',
    author: { name: 'Mappo 官方', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoKdY8AbKnVFyLcOm-h0oElmQX0jqiY1iyFG63OAySAme6u7yefNsMFTilTQCZAamQHcjQFlMbMNlKjlL3ukElG1wSzj8jZcw3soklfAkHuahMEaE9SwuLgBVPnxXWgyze_xHOEVHym6fLHlpW5NBhVNkVlLzQ5ruk4PlLnjGH74z-KkmZT4KmH8EqJskNrkR9kYQe1hBYzsE1lvDJRDJtfcaA88UUgpxINc0Kqw4a_53-ncgLYlPshEEfwsIdsZn6n4j4IMkYkA' },
    tags: ['彩虹眷村', '彩繪'],
    style: 'circle',
    tilt: 4,
    position: { top: '42%', left: '52%' },
    washiTapeColor: 'rgba(217, 181, 255, 0.5)'
  },
  {
    id: 'central-3',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    caption: '高美濕地夕陽無限好，風力發電機佇立在金黃天空與倒影交融的泥灘。🌅',
    alt: 'Gaomei Wetlands sunset',
    date: '2026-06-23',
    region: 'central',
    author: { name: 'Mappo 官方', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoKdY8AbKnVFyLcOm-h0oElmQX0jqiY1iyFG63OAySAme6u7yefNsMFTilTQCZAamQHcjQFlMbMNlKjlL3ukElG1wSzj8jZcw3soklfAkHuahMEaE9SwuLgBVPnxXWgyze_xHOEVHym6fLHlpW5NBhVNkVlLzQ5ruk4PlLnjGH74z-KkmZT4KmH8EqJskNrkR9kYQe1hBYzsE1lvDJRDJtfcaA88UUgpxINc0Kqw4a_53-ncgLYlPshEEfwsIdsZn6n4j4IMkYkA' },
    tags: ['高美濕地', '夕陽'],
    style: 'circle',
    tilt: -1,
    position: { top: '64%', left: '22%' },
    washiTapeColor: 'rgba(239, 189, 151, 0.5)'
  },

  // --- OVERSEAS (國外) ---
  {
    id: 'overseas-1',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80',
    caption: '遠眺冠雪的富士山山頭，靜謐地守護在湖畔與小鎮。🏔️✨',
    alt: 'Mount Fuji seen from lakeside',
    date: '2026-06-15',
    region: 'overseas',
    author: { name: 'Mappo 官方', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoKdY8AbKnVFyLcOm-h0oElmQX0jqiY1iyFG63OAySAme6u7yefNsMFTilTQCZAamQHcjQFlMbMNlKjlL3ukElG1wSzj8jZcw3soklfAkHuahMEaE9SwuLgBVPnxXWgyze_xHOEVHym6fLHlpW5NBhVNkVlLzQ5ruk4PlLnjGH74z-KkmZT4KmH8EqJskNrkR9kYQe1hBYzsE1lvDJRDJtfcaA88UUgpxINc0Kqw4a_53-ncgLYlPshEEfwsIdsZn6n4j4IMkYkA' },
    tags: ['富士山', '日本'],
    style: 'polaroid',
    tilt: -2.5,
    position: { top: '12%', left: '8%' },
    washiTapeColor: 'rgba(165, 201, 255, 0.4)'
  },
  {
    id: 'overseas-2',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80',
    caption: '東京深夜街頭繁華燈火，居酒屋高掛紅燈籠，下班後的微醺滋味。🏮',
    alt: 'Tokyo street evening circular',
    date: '2026-06-16',
    region: 'overseas',
    author: { name: 'Mappo 官方', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoKdY8AbKnVFyLcOm-h0oElmQX0jqiY1iyFG63OAySAme6u7yefNsMFTilTQCZAamQHcjQFlMbMNlKjlL3ukElG1wSzj8jZcw3soklfAkHuahMEaE9SwuLgBVPnxXWgyze_xHOEVHym6fLHlpW5NBhVNkVlLzQ5ruk4PlLnjGH74z-KkmZT4KmH8EqJskNrkR9kYQe1hBYzsE1lvDJRDJtfcaA88UUgpxINc0Kqw4a_53-ncgLYlPshEEfwsIdsZn6n4j4IMkYkA' },
    tags: ['東京', '街頭'],
    style: 'circle',
    tilt: 3,
    position: { top: '18%', left: '50%' },
    washiTapeColor: 'rgba(217, 181, 255, 0.5)'
  },
  {
    id: 'overseas-3',
    imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80',
    caption: '瑞士策馬特紅色特快列車穿行在阿爾卑斯綠野與壯麗的馬特洪峰前！🌲🇨🇭',
    alt: 'Zermatt red train and Matterhorn in Switzerland',
    date: '2026-06-17',
    region: 'overseas',
    author: { name: 'Mappo 官方', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoKdY8AbKnVFyLcOm-h0oElmQX0jqiY1iyFG63OAySAme6u7yefNsMFTilTQCZAamQHcjQFlMbMNlKjlL3ukElG1wSzj8jZcw3soklfAkHuahMEaE9SwuLgBVPnxXWgyze_xHOEVHym6fLHlpW5NBhVNkVlLzQ5ruk4PlLnjGH74z-KkmZT4KmH8EqJskNrkR9kYQe1hBYzsE1lvDJRDJtfcaA88UUgpxINc0Kqw4a_53-ncgLYlPshEEfwsIdsZn6n4j4IMkYkA' },
    tags: ['瑞士', '馬特洪峰'],
    style: 'large',
    tilt: 0.5,
    position: { top: '38%', left: '12%' },
    washiTapeColor: 'rgba(165, 201, 255, 0.4)'
  }
];

export const initialComments: Comment[] = [
  {
    id: 'c1',
    authorName: '小柔 Yuki',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXBhn1-eCiqOSGoT1DGvCSikVioe4s_hfLT5C2PM8TLEI_8qBIbXbWxjdHRO2nivE1ARki86GtX5Sdr37EOXlmNUpUxCDsC6UVahLOuQ0h_asZ4IKdS8MWrnmFHCL9rx_B0-EH03VaUB7T_Ls3iYMAabiG1_Ioa_TieUNWggqXrH5BslLPqKU17iFE1HJalqqL8lRFBEDIa6Kh9dn9SZEWsAEoPJlxAq1qTivrucmoNy_wyjLRT-7ZmXvusVHb1wLwq3UJ4LZMDg',
    content: '這裡的抹茶歐蕾真的很道地！讓我想起去年在京都的小旅行。有人推薦附近的文具店嗎？🍵',
    timestamp: '2024.03.10 · 14:20',
    tags: ['#CafeHopping', '#Memories'],
    rotation: -1.2,
    washiTapeColor: 'rgba(165, 201, 255, 0.5)'
  },
  {
    id: 'c2',
    authorName: '阿強 Ken',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwvmxoMXiojNjzmhCGKQHTf66ME6sDDPPiYg0k0BND9ifrsDHiO2nmK_k-vO-9d-C3CjeLrC63-27K4ZXRulfBevmkD40p227FD__csJUDUoqLrfe2LaSQPfDqTntG3fYwWmcfoGv39cpBbEOVEFNEB8LKZqjWeOz45Sg1_ffBgYrSDYq8buZXdR9FHTkJhLsDg7Bde7RrkqpmHJXjH9ZNmjKwGFMIOWZrziaqpN5Q6jBNcJZjyIXM6lcJE8w-QxRGiUQPDs4jJQ',
    content: '往前走兩分鐘有一家「紙之溫度」，那裡的拼貼膠帶非常齊全喔！',
    timestamp: '2024.03.11 · 09:15',
    rotation: 0.8,
    washiTapeColor: 'rgba(111, 80, 146, 0.3)'
  },
  {
    id: 'c3',
    authorName: 'Mia 喵喵',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8UITYZuJet9K1zSa3pvTa0UVPVSl5dnivntl-QZZWU9EuyHafuz74SxxBmE513nf_J20ibgGP_0uUdBxX5qfbawVEH-UWcOK0Ulok-RtKm5NhM_NXYSRASb7qqMnkx1prifgWtdRBon5jgFBAhp852Q0k-8_y4bzZaYcXe07r1Pt3spCQTy9hAoLdnf0KYBafsmi1y0g8khBZdoWf5KNacMCl4Rkn8k5PKN3uQpwrg9qzqP6JIeuFZ4-yw7hqwlYPP5vGkYOigw',
    content: '我也要去！有人現在在那邊嗎？想一起拼貼手帳！📒✨',
    timestamp: '剛剛',
    rotation: -0.5,
    washiTapeColor: 'rgba(59, 96, 143, 0.3)'
  }
];
