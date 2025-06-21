import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { cn, formatCurrency, formatPercentage } from "../lib/utils";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export interface StockCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  dividendYield?: number;
  annualDividend?: number;
  logo?: string;
  onAddToPortfolio?: () => void;
  className?: string;
}

const StockCard = React.forwardRef<HTMLDivElement, StockCardProps>(
  (
    {
      symbol,
      name,
      price,
      change,
      changePercent,
      dividendYield,
      annualDividend,
      logo = "📈",
      onAddToPortfolio,
      className,
      ...props
    },
    ref
  ) => {
    const isPositive = changePercent > 0;
    const changeColor = isPositive ? "text-success-500" : "text-danger-500";
    const changeSign = isPositive ? "+" : "";
    const ChangeIcon = isPositive ? TrendingUp : TrendingDown;

    return (
      <Card ref={ref} className={cn("overflow-hidden", className)} {...props}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-2xl">
                {logo}
              </div>
              <div>
                <CardTitle className="text-lg text-primary-600">
                  {symbol}
                </CardTitle>
                <p className="text-sm text-gray-600 truncate max-w-[180px]">
                  {name}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{formatCurrency(price)}</div>
              <div
                className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  changeColor
                )}
              >
                <ChangeIcon className="h-4 w-4" />
                {changeSign}
                {formatCurrency(change)} ({changeSign}
                {formatPercentage(changePercent)})
              </div>
            </div>
          </div>
        </CardHeader>

        {(dividendYield !== undefined || annualDividend !== undefined) && (
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4">
              {dividendYield !== undefined && (
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-2 flex items-center justify-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    배당수익률
                  </p>
                  <Badge variant="default" className="text-base font-semibold">
                    {formatPercentage(dividendYield)}
                  </Badge>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(dividendYield * 2, 100)}%` }}
                    />
                  </div>
                </div>
              )}
              {annualDividend !== undefined && (
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-2">연간 배당금</p>
                  <Badge variant="success" className="text-base font-semibold">
                    {formatCurrency(annualDividend)}
                  </Badge>
                </div>
              )}
            </div>

            {onAddToPortfolio && (
              <Button
                className="w-full mt-4"
                variant="accent"
                onClick={onAddToPortfolio}
              >
                포트폴리오에 추가
              </Button>
            )}
          </CardContent>
        )}
      </Card>
    );
  }
);
StockCard.displayName = "StockCard";

export { StockCard };
