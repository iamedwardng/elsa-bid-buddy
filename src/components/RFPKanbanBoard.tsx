import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Building, Calendar, DollarSign, User, Clock, Target, 
  AlertTriangle, CheckCircle, Eye, Edit3 
} from "lucide-react";
import { RFP, RFPStatus } from "@/types/rfp";

interface RFPKanbanBoardProps {
  rfps: RFP[];
  onRFPClick?: (rfp: RFP) => void;
  onStatusChange?: (rfpId: string, newStatus: RFPStatus) => void;
}

const RFPKanbanBoard = ({ rfps, onRFPClick, onStatusChange }: RFPKanbanBoardProps) => {
  const columns: { status: RFPStatus; title: string; color: string }[] = [
    { status: "assigning", title: "Assigning", color: "bg-blue-100 border-blue-200" },
    { status: "drafting", title: "Drafting", color: "bg-yellow-100 border-yellow-200" },
    { status: "submitted", title: "Submitted", color: "bg-purple-100 border-purple-200" },
    { status: "awarded", title: "Awarded", color: "bg-green-100 border-green-200" },
    { status: "lost", title: "Lost", color: "bg-red-100 border-red-200" },
    { status: "not-in-focus", title: "Not in Focus", color: "bg-gray-100 border-gray-200" },
  ];

  const getRFPsByStatus = (status: RFPStatus) => {
    return rfps.filter(rfp => rfp.status === status);
  };

  const getDeadlineColor = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (daysUntil < 0) return "text-red-600 bg-red-50";
    if (daysUntil <= 3) return "text-red-600 bg-red-50";
    if (daysUntil <= 7) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  const getRemainingDays = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (daysUntil < 0) return "Overdue";
    if (daysUntil === 0) return "Due today";
    if (daysUntil === 1) return "1 day left";
    return `${daysUntil} days left`;
  };

  const getWinProbabilityColor = (probability: number) => {
    if (probability >= 70) return "text-green-600";
    if (probability >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const RFPCard = ({ rfp }: { rfp: RFP }) => (
    <Card className="cursor-pointer hover:shadow-md transition-all duration-200 mb-3">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm font-medium line-clamp-2 leading-tight">
            {rfp.title}
          </CardTitle>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onRFPClick?.(rfp);
              }}
            >
              <Eye className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                // Handle edit action
              }}
            >
              <Edit3 className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Building className="h-3 w-3" />
            <span className="truncate">{rfp.clientCompany}</span>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{new Date(rfp.submissionDeadline).toLocaleDateString()}</span>
          </div>
          
          <div className={`text-xs px-2 py-1 rounded-full ${getDeadlineColor(rfp.submissionDeadline)}`}>
            {getRemainingDays(rfp.submissionDeadline)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        {/* Win Probability */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Target className="h-3 w-3" />
              Win Probability
            </span>
            <span className={`text-xs font-medium ${getWinProbabilityColor(rfp.winProbability)}`}>
              {rfp.winProbability}%
            </span>
          </div>
          <Progress value={rfp.winProbability} className="h-1.5" />
        </div>

        {/* Value and Assignment */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {rfp.estimatedValue && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <DollarSign className="h-3 w-3" />
              <span className="truncate">{rfp.estimatedValue}</span>
            </div>
          )}
          
          {rfp.assignedPIC && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <User className="h-3 w-3" />
              <span className="truncate">{rfp.assignedPIC}</span>
            </div>
          )}
          
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{rfp.resourceEffortLogged}h logged</span>
          </div>
        </div>

        {/* Risk Flags */}
        {rfp.riskFlags.length > 0 && (
          <div className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3 text-red-500" />
            <span className="text-xs text-red-600">{rfp.riskFlags.length} risk flag(s)</span>
          </div>
        )}

        {/* Compliance Status */}
        <div className="flex items-center gap-1">
          <CheckCircle 
            className={`h-3 w-3 ${
              rfp.complianceStatus === 'compliant' ? 'text-green-500' : 
              rfp.complianceStatus === 'non-compliant' ? 'text-red-500' : 'text-yellow-500'
            }`} 
          />
          <span className="text-xs text-muted-foreground capitalize">
            {rfp.complianceStatus.replace('-', ' ')}
          </span>
        </div>

        {/* Industry Badge */}
        <Badge variant="outline" className="text-xs">
          {rfp.industry.replace('-', ' ').toUpperCase()}
        </Badge>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">RFP Pipeline</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{rfps.length} Total RFPs</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {columns.map((column) => {
          const columnRFPs = getRFPsByStatus(column.status);
          
          return (
            <div key={column.status} className={`rounded-lg border-2 border-dashed p-4 min-h-[500px] ${column.color}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-sm">{column.title}</h3>
                <Badge variant="secondary" className="text-xs">
                  {columnRFPs.length}
                </Badge>
              </div>
              
              <div className="space-y-3">
                {columnRFPs.map((rfp) => (
                  <RFPCard key={rfp.id} rfp={rfp} />
                ))}
                
                {columnRFPs.length === 0 && (
                  <div className="text-center text-muted-foreground text-xs py-8">
                    No RFPs in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RFPKanbanBoard;