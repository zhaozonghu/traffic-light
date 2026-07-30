/**
 * 从导出的元数据 JSON 生成 data/sites.json，并下载 logo 到 public/logos/
 *
 * 用法: node scripts/import-sites.mjs <源数据文件路径>
 *
 * 映射规则（字段名保持与现有 schema 一致）:
 *   分类: { id, name, sites }        <- list[].{id, name, websites}
 *   站点: { id, name, logo, desc, tags, url } <- websites[] 同名字段
 * logo 处理:
 *   下载 SUPABASE_PREFIX/<源logo路径> 到 public/logos/<站点id>.<扩展名>，
 *   JSON 写 "/logos/<站点id>.<扩展名>"；下载失败则直接写远程完整 URL。
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const SUPABASE_PREFIX =
  "https://athbiwlqrieaoetfapxd.supabase.co/storage/v1/object/public/logos";

const root = path.resolve(import.meta.dirname, "..");
const logosDir = path.join(root, "public", "logos");
const outFile = path.join(root, "data", "sites.json");

const srcPath = process.argv[2];
if (!srcPath) {
  console.error("用法: node scripts/import-sites.mjs <源数据文件路径>");
  process.exit(1);
}

// 源数据存在尾逗号（,] / ,}），先清理再解析
const raw = await readFile(srcPath, "utf8");
const sanitized = raw.replace(/,\s*([\]}])/g, "$1");
const { list } = JSON.parse(sanitized);

await mkdir(logosDir, { recursive: true });

/** 下载单个 logo，成功返回本地路径，失败返回远程 URL */
async function fetchLogo(site) {
  const remoteUrl = `${SUPABASE_PREFIX}/${site.logo}`;
  const ext = path.extname(site.logo) || ".png";
  const fileName = `${site.id}${ext}`;
  try {
    const res = await fetch(remoteUrl, {
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length === 0) throw new Error("empty body");
    await writeFile(path.join(logosDir, fileName), buf);
    return { logo: `/logos/${fileName}`, ok: true };
  } catch (err) {
    console.warn(`  ✗ ${site.name}: ${err.message} -> 使用远程 URL`);
    return { logo: remoteUrl, ok: false };
  }
}

/** 并发池 */
async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (i < items.length) {
        const idx = i++;
        results[idx] = await fn(items[idx]);
      }
    })
  );
  return results;
}

const allSites = list.flatMap((cat) => cat.websites);
console.log(`分类 ${list.length} 个，站点 ${allSites.length} 个，开始下载 logo...`);

const logoResults = await mapLimit(allSites, 8, fetchLogo);
const logoMap = new Map(allSites.map((s, i) => [s.id, logoResults[i]]));

const categories = list.map((cat) => ({
  id: cat.id,
  name: cat.name,
  sites: cat.websites.map((site) => ({
    id: site.id,
    name: site.name,
    logo: logoMap.get(site.id).logo,
    desc: site.desc,
    tags: site.tags,
    url: site.url,
  })),
}));

await writeFile(outFile, JSON.stringify(categories, null, 2) + "\n", "utf8");

const okCount = logoResults.filter((r) => r.ok).length;
console.log(
  `完成: sites.json 已写入；logo 本地 ${okCount}/${allSites.length}，其余走远程 URL`
);
