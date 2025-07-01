const { execSync } = require("child_process");
const path = require("path");

const uiPackagePath = path.join(__dirname, "..", "packages", "ui");

const component = process.argv[2];
if (!component) {
  console.error("사용법: npm run ui:add <component-name>");
  console.error("예시: npm run ui:add button");
  process.exit(1);
}

try {
  console.log(`🚀 shadcn/ui 컴포넌트 "${component}" 추가 중...`);

  // UI 패키지 디렉토리에서 shdcn add 실행
  execSync(`cd ${uiPackagePath} && pnpx shadcn@latest add ${component}`, {
    stdio: "inherit",
  });

  console.log(`✅ 컴포넌트 "${component}" 성공적으로 추가되었습니다!`);
  console.log(`📁 위치: packages/ui/src/components/ui/${component}.tsx`);
} catch (error) {
  console.error(`❌ 컴포넌트 추가 실패:`, error.message);
  process.exit(1);
}
