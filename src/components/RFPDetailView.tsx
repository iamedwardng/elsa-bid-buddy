import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building, Calendar, DollarSign, MapPin, User, Clock, Target, 
  FileText, AlertTriangle, CheckCircle, Users, Upload, Edit3,
  TrendingUp, Flag, MessageSquare
} from "lucide-react";
import { RFP } from "@/types/rfp";

interface RFPDetailViewProps {
  rfp: RFP;
  onEdit?: () => void;
  onStatusChange?: (status: RFP['status']) => void;
}

const RFPDetailView = ({ rfp, onEdit, onStatusChange }: RFPDetailViewProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "assigning": return "bg-blue-500";
      case "drafting": return "bg-yellow-500";
      case "submitted": return "bg-purple-500";
      case "awarded": return "bg-green-500";
      case "lost": return "bg-red-500";
      case "not-in-focus": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case "compliant": return "text-green-600";
      case "non-compliant": return "text-red-600";
      case "pending-review": return "text-yellow-600";
      default: return "text-gray-600";
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "text-red-600 bg-red-50";
      case "medium": return "text-yellow-600 bg-yellow-50";
      case "low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-foreground">{rfp.title}</h1>
            <Badge variant="outline" className={`${getStatusColor(rfp.status)} text-white border-0`}>
              {rfp.status.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              {rfp.clientCompany}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Due: {rfp.submissionDeadline}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {rfp.geography}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onEdit}>
            <Edit3 className="h-4 w-4" />
            Edit RFP
          </Button>
          <Button>
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Win Probability</p>
                <p className="text-2xl font-bold text-primary">{rfp.winProbability}%</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
            <Progress value={rfp.winProbability} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Estimated Value</p>
                <p className="text-2xl font-bold text-foreground">{rfp.estimatedValue || "TBD"}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Compliance</p>
                <p className={`text-lg font-semibold ${getComplianceColor(rfp.complianceStatus)}`}>
                  {rfp.complianceStatus.replace('-', ' ').toUpperCase()}
                </p>
              </div>
              <CheckCircle className={`h-8 w-8 ${getComplianceColor(rfp.complianceStatus)}`} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Effort Logged</p>
                <p className="text-2xl font-bold text-foreground">{rfp.resourceEffortLogged}h</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="intel">Intelligence</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>RFP Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Tender Reference</label>
                  <p className="text-sm">{rfp.tenderReference || "Not provided"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Client Registration</label>
                  <p className="text-sm">{rfp.clientRegistrationPlace}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Industry</label>
                  <p className="text-sm">{rfp.industry.replace('-', ' ').toUpperCase()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Source</label>
                  <p className="text-sm">{rfp.source.replace('-', ' ').toUpperCase()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date Received</label>
                  <p className="text-sm">{rfp.dateReceived}</p>
                </div>
              </CardContent>
            </Card>

            {/* Risk Flags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                {rfp.riskFlags.length > 0 ? (
                  <div className="space-y-2">
                    {rfp.riskFlags.map((risk, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-red-500" />
                        <span className="text-sm">{risk}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No risk flags identified</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Specification Details */}
          <Card>
            <CardHeader>
              <CardTitle>Specification Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap">{rfp.specificationDetails}</p>
            </CardContent>
          </Card>

          {/* Win Factors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Win Probability Factors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {rfp.winFactors.map((factor, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{factor}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rfp.complianceChecklist.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle 
                        className={`h-5 w-5 ${
                          item.status === 'complete' ? 'text-green-500' : 
                          item.status === 'not-applicable' ? 'text-gray-400' : 'text-yellow-500'
                        }`} 
                      />
                      <span className="text-sm">{item.requirement}</span>
                    </div>
                    <Badge variant={item.status === 'complete' ? 'default' : 'secondary'}>
                      {item.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Assigned PIC</label>
                  <p className="text-sm font-medium">{rfp.assignedPIC || "Not assigned"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Reviewer</label>
                  <p className="text-sm">{rfp.reviewer || "Not assigned"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Approver</label>
                  <p className="text-sm">{rfp.approver || "Not assigned"}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Supporting SMEs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {rfp.supportingSMEs.map((sme) => (
                    <div key={sme.id} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="text-sm font-medium">{sme.name}</span>
                      </div>
                      <Badge variant="outline">{sme.role.toUpperCase()}</Badge>
                    </div>
                  ))}
                  {rfp.supportingSMEs.length === 0 && (
                    <p className="text-sm text-muted-foreground">No SMEs assigned yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Task Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rfp.tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{task.title}</p>
                      {task.description && (
                        <p className="text-xs text-muted-foreground">{task.description}</p>
                      )}
                      {task.assignedTo && (
                        <p className="text-xs text-muted-foreground">Assigned to: {task.assignedTo}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={task.status === 'complete' ? 'default' : 'secondary'}
                        className="mb-1"
                      >
                        {task.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                      {task.dueDate && (
                        <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="intel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Competitor Intelligence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rfp.competitorIntel.map((intel) => (
                  <div key={intel.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{intel.competitor}</span>
                      <Badge variant={intel.relevance === 'high' ? 'destructive' : intel.relevance === 'medium' ? 'default' : 'secondary'}>
                        {intel.relevance.toUpperCase()} RELEVANCE
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{intel.intelligence}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Source: {intel.source}</span>
                      <span>{intel.date}</span>
                    </div>
                  </div>
                ))}
                {rfp.competitorIntel.length === 0 && (
                  <p className="text-sm text-muted-foreground">No competitor intelligence available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Versions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rfp.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">{doc.filename}</p>
                        <p className="text-xs text-muted-foreground">v{doc.version} • {doc.uploadedBy} • {doc.uploadedAt}</p>
                      </div>
                    </div>
                    <Badge variant={doc.type === 'final' ? 'default' : 'outline'}>
                      {doc.type.toUpperCase()}
                    </Badge>
                  </div>
                ))}
                {rfp.documents.length === 0 && (
                  <p className="text-sm text-muted-foreground">No documents uploaded yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Internal Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Internal Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm whitespace-pre-wrap">{rfp.internalNotes || "No internal notes yet."}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RFPDetailView;