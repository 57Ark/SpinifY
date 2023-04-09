import { atom } from "jotai";

export const stepAtom = atom<number>(-1);

export const userIdAtom = atom<string>("");

export const playlistIdListAtom = atom<string[]>([]);
