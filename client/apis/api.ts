import { hashData } from "@/utils/utility";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${hashData()}`,
  },
});

export const getData = async ({ endPoint }: { endPoint: string }) => {
  try {
    const res = await api.get(endPoint);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postData = async ({
  endPoint,
  data,
}: {
  endPoint: string;
  data: any;
}) => {
  try {
    const res = await api.post(endPoint, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
