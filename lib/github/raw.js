import fs from 'fs';
import pathMod from 'path';
import fetch from '../fetch';
import { RAW_GITHUB_URL, ORGANIZATION_NAME, REPOSITORY_NAME, DEFAULT_BRANCH } from './constants';

function getErrorText(res) {
  try {
    return res.text();
  } catch (err) {
    return res.statusText;
  }
}

async function getError(res) {
  const errorText = await getErrorText(res);
  const error = new Error(`GitHub raw download error (${res.status}): ${errorText}`);

  error.status = res.status;
  error.headers = res.headers.raw();

  return error;
}

export async function getRawFileFromGitHub(path) {
  const res = await fetch(RAW_GITHUB_URL + path);

  if (res.ok) return res.text();
  throw await getError(res);
}

export function getRawFileFromRepo(path) {
  return getRawFileFromGitHub(`/${ORGANIZATION_NAME}/${REPOSITORY_NAME}/${DEFAULT_BRANCH}/${path}`);
}

export async function getRawFileFromLocalProject(path) {
  return fs.readFileSync(pathMod.join(process.cwd(), path), 'utf8');
}
