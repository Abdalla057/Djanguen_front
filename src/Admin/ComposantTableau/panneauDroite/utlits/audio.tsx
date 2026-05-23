import { API_URL } from "../constante/constante.tsx";

export const buildAudioUrl = (
  fichierAudio: string
) => {

  const cleanPath = fichierAudio
    .replace(/^\/?uploads\/?/, "")
    .replace(/\\/g, "/");

  return `${API_URL}/uploads/${cleanPath}`;
};