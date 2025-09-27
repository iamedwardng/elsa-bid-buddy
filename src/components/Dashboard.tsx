import { FileText, Users, TrendingUp, Clock, Target, CheckCircle, AlertCircle, Plus, Kanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetricCard from "./MetricCard";
import RFPCard from "./RFPCard";
import RFPKanbanBoard from "./RFPKanbanBoard";
import { RFP } from "@/types/rfp";

const Dashboard = () => {
  // Mock data for demonstration
  const metrics = [
    {
      title: "Active RFPs",
      value: "24",
      change: 12,
      changeLabel: "vs last month",
      icon: <FileText className="h-4 w-4" />,
      variant: "default" as const
    },
    {
      title: "Win Rate",
      value: "68%",
      change: 8,
      changeLabel: "vs last quarter",
      icon: <Target className="h-4 w-4" />,
      variant: "success" as const
    },
    {
      title: "Avg Response Time",
      value: "3.2 days",
      change: -15,
      changeLabel: "improvement",
      icon: <Clock className="h-4 w-4" />,
      variant: "success" as const
    },
    {
      title: "Team Utilization",
      value: "82%",
      change: 5,
      changeLabel: "vs last month",
      icon: <Users className="h-4 w-4" />,
      variant: "warning" as const
    }
  ];

  // Mock RFP data with comprehensive fields
  const rfpData: RFP[] = [
    {
      id: "RFP-2024-001",
      title: "Cloud Infrastructure Modernization for Financial Services",
      clientCompany: "Global Bank Corp",
      clientRegistrationPlace: "Delaware, USA",
      dateReceived: "2024-11-15",
      submissionDeadline: "2024-12-15",
      specificationDetails: "Comprehensive cloud migration and modernization project including infrastructure setup, security implementation, and staff training.",
      tenderReference: "GBC-CLOUD-2024-001",
      source: "portal",
      industry: "finance",
      geography: "regional",
      estimatedValue: "$2.5M",
      bidBondRequired: true,
      bidBondAmount: "$125,000",
      complianceStatus: "pending-review",
      mandatoryRequirements: ["ISO 27001", "SOC 2 Type II", "Cloud Security Certification"],
      complianceChecklist: [],
      assignedPIC: "Sarah Chen",
      supportingSMEs: [
        { id: "sme1", name: "John Tech", role: "technical", email: "john@company.com" },
        { id: "sme2", name: "Jane Finance", role: "finance", email: "jane@company.com" }
      ],
      reviewer: "Mike Manager",
      approver: "Lisa Director",
      status: "drafting",
      tasks: [
        { id: "task1", title: "Technical proposal draft", status: "in-progress", assignedTo: "John Tech", dueDate: "2024-12-01" },
        { id: "task2", title: "Financial analysis", status: "pending", assignedTo: "Jane Finance", dueDate: "2024-12-05" }
      ],
      documents: [],
      internalNotes: "High-priority client with existing relationship. Focus on security and compliance aspects.",
      winProbability: 75,
      winFactors: ["Existing relationship", "Strong technical capability", "Competitive pricing"],
      competitorIntel: [
        { id: "intel1", competitor: "TechCorp", intelligence: "Recently won similar project", source: "Industry report", date: "2024-11-20", relevance: "high" }
      ],
      resourceEffortLogged: 24,
      estimatedCost: 1800000,
      riskFlags: ["Tight deadline", "Complex compliance requirements"],
      createdAt: "2024-11-15T10:00:00Z",
      updatedAt: "2024-11-25T15:30:00Z",
      createdBy: "System",
      similarRFPs: []
    },
    {
      id: "RFP-2024-002",
      title: "Digital Transformation Platform Implementation",
      clientCompany: "Tech Solutions Ltd",
      clientRegistrationPlace: "London, UK",
      dateReceived: "2024-11-20",
      submissionDeadline: "2024-12-20",
      specificationDetails: "End-to-end digital transformation including process automation, data analytics platform, and change management.",
      tenderReference: "TSL-DT-2024-002",
      source: "email",
      industry: "ict",
      geography: "international",
      estimatedValue: "$1.8M",
      bidBondRequired: false,
      complianceStatus: "compliant",
      mandatoryRequirements: ["GDPR Compliance", "Agile methodology experience"],
      complianceChecklist: [],
      assignedPIC: "Alex Thompson",
      supportingSMEs: [],
      status: "assigning",
      tasks: [],
      documents: [],
      internalNotes: "New client opportunity. Requires careful positioning.",
      winProbability: 45,
      winFactors: ["Innovative approach", "Strong methodology"],
      competitorIntel: [],
      resourceEffortLogged: 8,
      estimatedCost: 1200000,
      riskFlags: ["New client", "Competitive market"],
      createdAt: "2024-11-20T14:00:00Z",
      updatedAt: "2024-11-25T16:00:00Z",
      createdBy: "System",
      similarRFPs: []
    },
    {
      id: "RFP-2024-003",
      title: "Enterprise Security Assessment and Remediation",
      clientCompany: "Manufacturing Inc",
      clientRegistrationPlace: "Singapore",
      dateReceived: "2024-11-10",
      submissionDeadline: "2024-12-10",
      specificationDetails: "Comprehensive security audit, vulnerability assessment, and remediation roadmap for manufacturing operations.",
      tenderReference: "MI-SEC-2024-003",
      source: "direct-invitation",
      industry: "manufacturing",
      geography: "regional",
      estimatedValue: "$950K",
      bidBondRequired: true,
      bidBondAmount: "$47,500",
      complianceStatus: "compliant",
      mandatoryRequirements: ["ISO 27001", "Manufacturing security experience"],
      complianceChecklist: [],
      assignedPIC: "Michael Rodriguez",
      supportingSMEs: [
        { id: "sme3", name: "Security Expert", role: "technical", email: "security@company.com" }
      ],
      reviewer: "Sarah Senior",
      status: "submitted",
      tasks: [],
      documents: [
        { id: "doc1", filename: "Security Proposal v2.0.pdf", version: "2.0", uploadedBy: "Michael Rodriguez", uploadedAt: "2024-12-05", type: "final" }
      ],
      internalNotes: "Direct invitation from existing client. High confidence in win.",
      winProbability: 85,
      winFactors: ["Direct invitation", "Previous successful projects", "Specialized expertise"],
      competitorIntel: [],
      resourceEffortLogged: 32,
      estimatedCost: 650000,
      riskFlags: [],
      createdAt: "2024-11-10T09:00:00Z",
      updatedAt: "2024-12-05T11:00:00Z",
      createdBy: "System",
      similarRFPs: []
    }
  ];

  // Convert to legacy format for existing RFPCard component
  const recentRFPs = rfpData.slice(0, 3).map(rfp => {
    let status: "new" | "in-progress" | "review" | "submitted";
    
    switch (rfp.status) {
      case "drafting":
        status = "in-progress";
        break;
      case "assigning":
        status = "new";
        break;
      case "submitted":
        status = "submitted";
        break;
      default:
        status = "review";
        break;
    }
    
    return {
      id: rfp.id,
      title: rfp.title,
      buyer: rfp.clientCompany,
      value: rfp.estimatedValue,
      deadline: new Date(rfp.submissionDeadline).toLocaleDateString(),
      region: rfp.geography,
      winProbability: rfp.winProbability,
      status,
      assignedTo: rfp.assignedPIC,
      timeRemaining: `${Math.ceil((new Date(rfp.submissionDeadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} days left`
    };
  });

  const quickStats = [
    { label: "Due This Week", value: "5", color: "text-warning" },
    { label: "Overdue", value: "2", color: "text-destructive" },
    { label: "Submitted", value: "12", color: "text-success" },
    { label: "Won This Month", value: "8", color: "text-success" }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back! 👋</h1>
          <p className="text-muted-foreground">Here's what's happening with your tenders today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Import RFPs
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New RFP
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Quick Stats Row */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Quick Overview
          </CardTitle>
          <CardDescription>
            At-a-glance status of your tender pipeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-muted/30">
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* RFP Management */}
      <Tabs defaultValue="recent" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">RFP Management</h2>
            <p className="text-sm text-muted-foreground">Track and manage your tender opportunities</p>
          </div>
          <div className="flex items-center gap-2">
            <TabsList>
              <TabsTrigger value="recent" className="gap-2">
                <FileText className="h-4 w-4" />
                Recent View
              </TabsTrigger>
              <TabsTrigger value="kanban" className="gap-2">
                <Kanban className="h-4 w-4" />
                Pipeline View
              </TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm">
              View All RFPs
            </Button>
          </div>
        </div>

        <TabsContent value="recent" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {recentRFPs.map((rfp) => (
              <RFPCard key={rfp.id} {...rfp} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="kanban" className="space-y-4">
          <RFPKanbanBoard 
            rfps={rfpData} 
            onRFPClick={(rfp) => console.log("View RFP:", rfp)}
            onStatusChange={(rfpId, newStatus) => console.log("Status change:", rfpId, newStatus)}
          />
        </TabsContent>
      </Tabs>

      {/* Action Items */}
      <Card className="shadow-card border-warning/20 bg-gradient-to-br from-card to-warning/5">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-warning">
            <AlertCircle className="h-5 w-5" />
            Action Items
          </CardTitle>
          <CardDescription>
            Tasks that need your immediate attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
              <div>
                <p className="font-medium text-card-foreground">Review compliance checklist for RFP-2024-001</p>
                <p className="text-sm text-muted-foreground">Due in 2 hours</p>
              </div>
              <Button size="sm">Review</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
              <div>
                <p className="font-medium text-card-foreground">Assign PIC for new RFP from Tech Solutions Ltd</p>
                <p className="text-sm text-muted-foreground">Received 1 hour ago</p>
              </div>
              <Button size="sm" variant="outline">Assign</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
              <div>
                <p className="font-medium text-card-foreground">Submit final proposal for Manufacturing Inc</p>
                <p className="text-sm text-muted-foreground">Due tomorrow</p>
              </div>
              <Button size="sm">Submit</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;