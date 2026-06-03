#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

function runGit(args, options = {}) {
  return execFileSync('git', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...options,
  }).trim();
}

function runGitAllowEmpty(args, options = {}) {
  try {
    return runGit(args, options);
  } catch (error) {
    const stderr = String(error?.stderr ?? '');
    const message = stderr.trim() || error.message;
    throw new Error(message);
  }
}

function formatStatusLine(line) {
  const status = line.slice(0, 2);
  const file = line.slice(3);
  return `  ${status.padEnd(3)} ${file}`;
}

function inferCommitMessage(statusLines) {
  const files = statusLines
    .map((line) => line.slice(3).trim())
    .filter(Boolean)
    .slice(0, 3);

  if (files.length === 0) {
    return 'chore: update project files';
  }

  if (files.length === 1) {
    return `chore: update ${files[0]}`;
  }

  return `chore: update ${files[0]} and ${files.length - 1} more`;
}

async function confirm(rl, question, defaultYes = true) {
  const suffix = defaultYes ? '[Y/n]' : '[y/N]';
  const answer = (await rl.question(`${question} ${suffix} `)).trim().toLowerCase();

  if (!answer) {
    return defaultYes;
  }

  return ['y', 'yes', 's', 'si', 'sí'].includes(answer);
}

async function main() {
  let statusOutput;

  try {
    statusOutput = runGit(['status', '--porcelain=v1']);
  } catch (error) {
    console.error('No pude leer el estado de Git.');
    console.error(String(error.message || error));
    process.exit(1);
  }

  if (!statusOutput) {
    console.log('No hay cambios para publicar.');
    return;
  }

  const statusLines = statusOutput.split('\n').filter(Boolean);
  const branch = runGitAllowEmpty(['branch', '--show-current']) || '(detached HEAD)';
  let remote = '(sin remoto origin)';
  try {
    remote = runGit(['remote', 'get-url', 'origin']) || remote;
  } catch {
    remote = '(sin remoto origin)';
  }

  let stat = '';
  try {
    stat = runGit(['diff', '--stat']);
  } catch {
    stat = '';
  }

  console.log('');
  console.log(`Rama: ${branch}`);
  console.log(`Remoto: ${remote}`);
  console.log('');
  console.log('Cambios detectados:');
  statusLines.forEach((line) => console.log(formatStatusLine(line)));

  if (stat) {
    console.log('');
    console.log('Resumen del diff:');
    console.log(stat);
  }

  const rl = createInterface({ input, output });

  try {
    const shouldCommit = await confirm(rl, '¿Quieres crear un commit con estos cambios?');
    if (!shouldCommit) {
      console.log('Cancelado. No se hicieron cambios.');
      return;
    }

    const defaultMessage = inferCommitMessage(statusLines);
    const commitMessageInput = await rl.question(`Mensaje del commit [${defaultMessage}]: `);
    const commitMessage = commitMessageInput.trim() || defaultMessage;

    console.log('');
    console.log('Preparando commit...');
    runGit(['add', '-A']);
    runGit(['commit', '-m', commitMessage]);
    console.log(`Commit creado: ${commitMessage}`);

    const shouldPush = await confirm(rl, '¿Quieres hacer push al remoto origin?');
    if (!shouldPush) {
      console.log('Push omitido.');
      return;
    }

    const currentBranch = runGitAllowEmpty(['branch', '--show-current']);
    if (!currentBranch) {
      throw new Error('No se pudo detectar la rama actual para hacer push.');
    }

    runGit(['push', '-u', 'origin', currentBranch]);
    console.log(`Push completado en origin/${currentBranch}.`);
  } catch (error) {
    console.error('');
    console.error('No se pudo completar el flujo de publicación.');
    console.error(String(error.message || error));
    process.exitCode = 1;
  } finally {
    rl.close();
  }
}

await main();
