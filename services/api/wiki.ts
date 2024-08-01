import axios from "axios";
import { Profile } from "@/types/wiki";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProfiles = async (code: string): Promise<Profile> => {
  try {
    const response = await axios.get<Profile>(
      `${API_BASE_URL}/profiles/${code}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
