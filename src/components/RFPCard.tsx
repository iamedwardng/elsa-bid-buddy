import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, DollarSign, MapPin, User, Clock, Target } from "lucide-react";

interface RFPCardProps {
  id: string;
  title: string;
  buyer: string;
  value?: string;
  deadline: string;
  region: string;
  winProbability: number;
  status: "new" | "in-progress" | "review" | "submitted";
  assignedTo?: string;
  timeRemaining: string;
}

const RFPCard = ({
  id,
  title,
  buyer,
  value,
  deadline,
  region,
  winProbability,
  status,
  assignedTo,
  timeRemaining
}: RFPCardProps) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "new": return "secondary";
      case "in-progress": return "default";
      case "review": return "warning";
      case "submitted": return "success";
      default: return "secondary";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "new": return "New";
      case "in-progress": return "In Progress";
      case "review": return "Under Review";
      case "submitted": return "Submitted";
      default: return "Unknown";
    }
  };

  const getWinProbabilityColor = (probability: number) => {
    if (probability >= 70) return "text-success";
    if (probability >= 40) return "text-warning";
    return "text-destructive";
  };

  const getWinProbabilityBg = (probability: number) => {
    if (probability >= 70) return "bg-success/10";
    if (probability >= 40) return "bg-warning/10";
    return "bg-destructive/10";
  };

  return (
    <Card className="shadow-card hover:shadow-elevated transition-all duration-200 border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-base font-semibold text-card-foreground mb-2 line-clamp-2">
              {title}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {buyer}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {region}
              </div>
            </div>
          </div>
          <Badge variant={getStatusVariant(status) as any}>
            {getStatusLabel(status)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Win Probability */}
        <div className={`p-3 rounded-lg ${getWinProbabilityBg(winProbability)}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-card-foreground flex items-center gap-1">
              <Target className="h-3 w-3" />
              Win Probability
            </span>
            <span className={`text-sm font-bold ${getWinProbabilityColor(winProbability)}`}>
              {winProbability}%
            </span>
          </div>
          <Progress 
            value={winProbability} 
            className="h-2"
          />
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Due: {deadline}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{timeRemaining}</span>
          </div>
          {value && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="h-3 w-3" />
              <span>{value}</span>
            </div>
          )}
          {assignedTo && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-3 w-3" />
              <span>{assignedTo}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1">
            View Details
          </Button>
          <Button size="sm" variant="outline">
            Quick Actions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RFPCard;