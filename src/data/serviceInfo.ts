export enum MusicService {
  YandexMusic = "yandex",
  VKMusic = "vk",
}

interface ServiceInfo {
  name: string;
  authUrl: string;
}

const Info: Record<MusicService, ServiceInfo> = {
  [MusicService.YandexMusic]: {
    name: "Яндекс Музыка",
    authUrl: `https://oauth.yandex.ru/authorize?response_type=code&client_id=20ff4773eefa43f1b843eb177ab540db&state=`,
  },
  [MusicService.VKMusic]: {
    name: "VK Music",
    authUrl: "https://accounts.spotify.com/authorize", // TODO TBD
  },
};

export function getAuthUrl(service: MusicService, state: string): string {
  return `${Info[service].authUrl}${encodeURIComponent(state)}`;
}

export function getServiceName(service: MusicService): string {
  return Info[service].name;
}
