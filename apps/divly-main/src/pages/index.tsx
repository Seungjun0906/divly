import { StockCard } from "@divly/ui";

export default function Home() {
  return (
    <div>
      <p className="text-amber-200">안녕</p>
      <StockCard
        className="w-full bg-red-500"
        symbol="AAPL"
        name="Apple Inc."
        price={150.75}
        change={1.25}
        changePercent={0.83}
        dividendYield={0.02}
        annualDividend={1.25}
      />
    </div>
  );
}
