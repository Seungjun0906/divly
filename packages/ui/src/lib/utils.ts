import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// === 숫자 포맷팅 함수들 ===

/**
 * 통화 형식으로 포맷팅
 * @param amount 금액
 * @param currency 통화 코드 (기본값: USD)
 * @param locale 로케일 (기본값: en-US)
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * 퍼센트 형식으로 포맷팅
 * @param value 값 (0.05 = 5%)
 * @param minimumFractionDigits 최소 소수점 자리수
 * @param maximumFractionDigits 최대 소수점 자리수
 */
export function formatPercentage(
  value: number,
  minimumFractionDigits: number = 2,
  maximumFractionDigits: number = 2
): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

/**
 * 일반 숫자 형식으로 포맷팅 (천 단위 콤마)
 * @param value 숫자 값
 * @param minimumFractionDigits 최소 소수점 자리수
 * @param maximumFractionDigits 최대 소수점 자리수
 */
export function formatNumber(
  value: number,
  minimumFractionDigits: number = 0,
  maximumFractionDigits: number = 2
): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

// === 배당금 계산 함수들 ===

/**
 * 배당 수익률 계산
 * @param annualDividend 연간 배당금
 * @param currentPrice 현재 주가
 * @returns 배당 수익률 (소수점 형태, 0.05 = 5%)
 */
export function calculateDividendYield(
  annualDividend: number,
  currentPrice: number
): number {
  if (currentPrice <= 0) return 0;
  return annualDividend / currentPrice;
}

/**
 * 연간 배당금 계산
 * @param quarterlyDividend 분기 배당금
 * @param frequency 배당 빈도 (기본값: 4 = 분기별)
 * @returns 연간 배당금
 */
export function calculateAnnualDividend(
  quarterlyDividend: number,
  frequency: number = 4
): number {
  return quarterlyDividend * frequency;
}

/**
 * 포트폴리오 배당금 계산
 * @param holdings 보유 주식 정보 배열
 * @returns 총 연간 배당금
 */
export function calculatePortfolioDividend(
  holdings: Array<{
    shares: number;
    annualDividendPerShare: number;
  }>
): number {
  return holdings.reduce((total, holding) => {
    return total + holding.shares * holding.annualDividendPerShare;
  }, 0);
}

/**
 * 월별 배당금 계산
 * @param annualDividend 연간 배당금
 * @returns 월별 배당금
 */
export function calculateMonthlyDividend(annualDividend: number): number {
  return annualDividend / 12;
}

/**
 * 목표 월 배당금을 위한 필요 투자금 계산
 * @param targetMonthlyDividend 목표 월 배당금
 * @param averageDividendYield 평균 배당 수익률
 * @returns 필요 투자금
 */
export function calculateRequiredInvestment(
  targetMonthlyDividend: number,
  averageDividendYield: number
): number {
  if (averageDividendYield <= 0) return 0;
  const targetAnnualDividend = targetMonthlyDividend * 12;
  return targetAnnualDividend / averageDividendYield;
}

// === 날짜 관련 유틸리티 ===

/**
 * 날짜를 지역화된 형식으로 포맷팅
 * @param date 날짜
 * @param locale 로케일 (기본값: en-US)
 * @param options 포맷 옵션
 */
export function formatDate(
  date: Date | string,
  locale: string = "en-US",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * 다음 배당일까지의 일수 계산
 * @param nextDividendDate 다음 배당일
 * @returns 남은 일수
 */
export function daysUntilDividend(nextDividendDate: Date | string): number {
  const today = new Date();
  const dividendDate =
    typeof nextDividendDate === "string"
      ? new Date(nextDividendDate)
      : nextDividendDate;

  const diffTime = dividendDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return Math.max(0, diffDays);
}

// === 유효성 검사 함수들 ===

/**
 * 주식 티커 심볼 유효성 검사
 * @param ticker 티커 심볼
 * @returns 유효 여부
 */
export function isValidTicker(ticker: string): boolean {
  // 1-5자리 알파벳, 선택적으로 점과 알파벳
  const tickerRegex = /^[A-Z]{1,5}(\.[A-Z]{1,2})?$/;
  return tickerRegex.test(ticker.toUpperCase());
}

/**
 * 배당 수익률이 합리적인 범위인지 확인
 * @param dividendYield 배당 수익률 (소수점 형태)
 * @returns 합리적 여부
 */
export function isReasonableDividendYield(dividendYield: number): boolean {
  // 0%~25% 범위를 합리적으로 간주
  return dividendYield >= 0 && dividendYield <= 0.25;
}

// === 색상 관련 유틸리티 ===

/**
 * 수익률에 따른 색상 클래스 반환
 * @param value 수익률 값
 * @returns Tailwind CSS 색상 클래스
 */
export function getPerformanceColor(value: number): string {
  if (value > 0) return "text-success-600";
  if (value < 0) return "text-danger-600";
  return "text-text-secondary";
}

/**
 * 배당 수익률에 따른 등급 색상 반환
 * @param dividendYield 배당 수익률
 * @returns Tailwind CSS 색상 클래스
 */
export function getDividendYieldColor(dividendYield: number): string {
  if (dividendYield >= 0.07) return "text-success-600"; // 7% 이상
  if (dividendYield >= 0.04) return "text-warning-600"; // 4-7%
  if (dividendYield >= 0.02) return "text-info-600"; // 2-4%
  return "text-text-secondary"; // 2% 미만
}
