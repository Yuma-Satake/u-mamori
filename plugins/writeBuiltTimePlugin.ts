import { log } from 'console';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { Plugin } from 'vite';

/**
 * 書き出したindex.htmlにビルド日時を埋め込むためのプラグイン
 */
const writeBuiltTimePlugin = (buildDirProps: string): Plugin => {
  const rootPath = process.cwd();
  const buildDir = join(rootPath, buildDirProps);
  const indexPath = join(buildDir, 'index.html');

  return {
    name: 'writeBuiltTimePlugin',
    closeBundle() {
      if (existsSync(indexPath)) {
        const timestampJST = JSON.stringify(
          new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
        );
        let htmlContent = readFileSync(indexPath, 'utf-8');
        htmlContent = htmlContent.replace(
          `<!doctype html>`,
          `<!-- Build time: ${timestampJST} -->\n<!DOCTYPE html>`
        );
        writeFileSync(indexPath, htmlContent);
        const barStr = '-'.repeat(32);
        log(
          `\n${barStr}\n[WriteBuiltTimePlugin]\nBuild time: ${timestampJST}\nWrite to index.html✅\n${barStr}\n`
        );
      }
    },
  };
};

export default writeBuiltTimePlugin;
