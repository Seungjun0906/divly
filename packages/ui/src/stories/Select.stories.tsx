import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const meta = {
  title: "UI/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "배당금 계산기를 위한 고품질 Select 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 사용법
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="옵션을 선택해주세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">첫 번째 옵션</SelectItem>
        <SelectItem value="option2">두 번째 옵션</SelectItem>
        <SelectItem value="option3">세 번째 옵션</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// 2. 모든 Variants
export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 w-[300px]">
      {["default", "primary", "success", "warning", "danger"].map((variant) => (
        <div key={variant} className="space-y-2">
          <label className="text-sm font-semibold capitalize">{variant}</label>
          <Select defaultValue="selected">
            <SelectTrigger variant={variant as any}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="selected">{variant} 스타일</SelectItem>
              <SelectItem value="option2">다른 옵션</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  ),
};

// 3. 모든 Sizes
export const Sizes: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 w-[250px]">
      {["sm", "md", "lg"].map((size) => (
        <div key={size} className="space-y-2">
          <label className="text-sm font-semibold capitalize">
            Size: {size}
          </label>
          <Select defaultValue="selected">
            <SelectTrigger size={size as any} variant="primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="selected">
                {size.toUpperCase()} 크기
              </SelectItem>
              <SelectItem value="option2">다른 옵션</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  ),
};

// 4. 배당금 계산기 - 통화 선택
export const CurrencySelector: Story = {
  render: () => (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-700">표시 통화</label>
      <Select defaultValue="usd">
            <SelectTrigger variant="primary" size="md" className="w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>주요 통화</SelectLabel>
            <SelectItem value="usd">
              <span className="flex items-center gap-2">
                🇺🇸 <span>USD (달러)</span>
              </span>
            </SelectItem>
            <SelectItem value="krw">
              <span className="flex items-center gap-2">
                🇰🇷 <span>KRW (원)</span>
              </span>
            </SelectItem>
            <SelectItem value="eur">
              <span className="flex items-center gap-2">
                🇪🇺 <span>EUR (유로)</span>
              </span>
            </SelectItem>
            <SelectItem value="jpy">
              <span className="flex items-center gap-2">
                🇯🇵 <span>JPY (엔)</span>
              </span>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
};

// 5. 배당금 계산기 - 투자 섹터
export const SectorSelector: Story = {
  render: () => (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-700">투자 섹터</label>
      <Select>
        <SelectTrigger variant="success" size="md" className="w-[280px]">
          <SelectValue placeholder="관심 섹터를 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>🏢 핵심 섹터</SelectLabel>
            <SelectItem value="technology">
              <span className="flex items-center gap-2">
                💻 <span>기술 (Technology)</span>
              </span>
            </SelectItem>
            <SelectItem value="healthcare">
              <span className="flex items-center gap-2">
                🏥 <span>헬스케어 (Healthcare)</span>
              </span>
            </SelectItem>
            <SelectItem value="finance">
              <span className="flex items-center gap-2">
                🏦 <span>금융 (Finance)</span>
              </span>
            </SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>🌟 성장 섹터</SelectLabel>
            <SelectItem value="clean-energy">
              <span className="flex items-center gap-2">
                ⚡ <span>청정 에너지</span>
              </span>
            </SelectItem>
            <SelectItem value="biotech">
              <span className="flex items-center gap-2">
                🧬 <span>바이오테크</span>
              </span>
            </SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>🛡️ 안정 섹터</SelectLabel>
            <SelectItem value="utilities">
              <span className="flex items-center gap-2">
                🔌 <span>유틸리티</span>
              </span>
            </SelectItem>
            <SelectItem value="consumer-staples">
              <span className="flex items-center gap-2">
                🛒 <span>생필품</span>
              </span>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
};

// 6. 배당금 계산기 - 투자 기간
export const InvestmentPeriod: Story = {
  render: () => (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-700">투자 기간</label>
      <Select defaultValue="5y">
        <SelectTrigger variant="primary" size="lg" className="w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>⏰ 투자 계획</SelectLabel>
            <SelectItem value="1y">1년 (단기)</SelectItem>
            <SelectItem value="3y">3년 (중기)</SelectItem>
            <SelectItem value="5y">5년 (장기) ⭐</SelectItem>
            <SelectItem value="10y">10년 (초장기)</SelectItem>
            <SelectItem value="retirement">은퇴까지 💎</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
};

// 7. 완성형 필터 예시
export const CompleteDividendFilter: Story = {
  render: () => (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-gray-900">🎯 배당주 필터</h3>
        <p className="text-sm text-gray-600">
          원하는 조건으로 배당주를 찾아보세요
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-primary-700">
            💰 배당수익률
          </label>
          <Select defaultValue="3-5">
            <SelectTrigger variant="primary" size="md" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectLabel>수익률 범위</SelectLabel>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="0-2">0-2% (안전)</SelectItem>
              <SelectItem value="2-4">2-4% (균형)</SelectItem>
              <SelectItem value="3-5">3-5% (추천) ⭐</SelectItem>
              <SelectItem value="5-7">5-7% (고수익)</SelectItem>
              <SelectItem value="7+">7%+ (고위험)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-success-700">
            🏢 섹터
          </label>
          <Select defaultValue="all">
            <SelectTrigger variant="success" size="md" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectLabel>투자 섹터</SelectLabel>
              <SelectItem value="all">전체 섹터</SelectItem>
              <SelectItem value="tech">💻 기술</SelectItem>
              <SelectItem value="finance">🏦 금융</SelectItem>
              <SelectItem value="healthcare">🏥 헬스케어</SelectItem>
              <SelectItem value="utilities">🔌 유틸리티</SelectItem>
              <SelectItem value="reit">🏠 리츠 (REIT)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-warning-700">
            📊 정렬 기준
          </label>
          <Select defaultValue="yield-desc">
            <SelectTrigger variant="warning" size="md" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectLabel>정렬 방식</SelectLabel>
              <SelectItem value="yield-desc">배당수익률 높은순</SelectItem>
              <SelectItem value="yield-asc">배당수익률 낮은순</SelectItem>
              <SelectItem value="dividend-desc">배당금액 높은순</SelectItem>
              <SelectItem value="growth-desc">배당성장률 높은순</SelectItem>
              <SelectItem value="safety-desc">안정성 높은순</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button className="gradient-primary text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-all shadow-glow-primary">
          🔍 배당주 검색하기
        </button>
      </div>
    </div>
  ),
};

// 8. 상태별 표시
export const States: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 w-[500px]">
      <div className="space-y-4">
        <h4 className="font-semibold">Normal States</h4>
        <div className="space-y-3">
          <Select>
            <SelectTrigger variant="default">
              <SelectValue placeholder="기본 상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">옵션 1</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="selected">
            <SelectTrigger variant="primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="selected">선택됨</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold">Disabled State</h4>
        <div className="space-y-3">
          <Select disabled>
            <SelectTrigger variant="default">
              <SelectValue placeholder="비활성화됨" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">옵션 1</SelectItem>
            </SelectContent>
          </Select>

          <Select disabled defaultValue="selected">
            <SelectTrigger variant="primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="selected">선택됨 (비활성화)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  ),
};
