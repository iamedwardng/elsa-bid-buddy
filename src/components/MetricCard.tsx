import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  variant?: "default" | "success" | "warning" | "destructive";
}

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon, 
  variant = "default" 
}: MetricCardProps) => {
  const getChangeColor = (change: number) => {
    if (change > 0) return "text-success";
    if (change < 0) return "text-destructive";
    return "text-muted-foreground";
  };

  const getCardStyle = () => {
    switch (variant) {
      case "success":
        return "border-success/20 bg-gradient-to-br from-card to-success/5";
      case "warning":
        return "border-warning/20 bg-gradient-to-br from-card to-warning/5";
      case "destructive":
        return "border-destructive/20 bg-gradient-to-br from-card to-destructive/5";
      default:
        return "border-border bg-card";
    }
  };

  return (
    <Card className={`shadow-card hover:shadow-elevated transition-all duration-200 ${getCardStyle()}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-card-foreground mb-1">
          {value}
        </div>
        {change !== undefined && (
          <div className="flex items-center gap-1">
            {change > 0 ? (
              <TrendingUp className="h-3 w-3 text-success" />
            ) : change < 0 ? (
              <TrendingDown className="h-3 w-3 text-destructive" />
            ) : null}
            <span className={`text-xs ${getChangeColor(change)}`}>
              {change > 0 ? "+" : ""}{change}%
            </span>
            {changeLabel && (
              <span className="text-xs text-muted-foreground">
                {changeLabel}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;