import { FileText, Users, TrendingUp, Clock, Target, CheckCircle, AlertCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MetricCard from "./MetricCard";
import RFPCard from "./RFPCard";

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

  const recentRFPs = [
    {
      id: "RFP-2024-001",
      title: "Cloud Infrastructure Modernization for Financial Services",
      buyer: "Global Bank Corp",
      value: "$2.5M",
      deadline: "Dec 15, 2024",
      region: "North America",
      winProbability: 75,
      status: "in-progress" as const,
      assignedTo: "Sarah Chen",
      timeRemaining: "8 days left"
    },
    {
      id: "RFP-2024-002", 
      title: "Digital Transformation Platform Implementation",
      buyer: "Tech Solutions Ltd",
      value: "$1.8M",
      deadline: "Dec 20, 2024",
      region: "Europe",
      winProbability: 45,
      status: "new" as const,
      timeRemaining: "13 days left"
    },
    {
      id: "RFP-2024-003",
      title: "Enterprise Security Assessment and Remediation",
      buyer: "Manufacturing Inc",
      value: "$950K",
      deadline: "Dec 10, 2024",
      region: "Asia Pacific",
      winProbability: 85,
      status: "review" as const,
      assignedTo: "Michael Rodriguez",
      timeRemaining: "3 days left"
    }
  ];

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
            New Proposal
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

      {/* Recent RFPs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Recent RFPs</h2>
            <p className="text-sm text-muted-foreground">Latest tender opportunities requiring attention</p>
          </div>
          <Button variant="outline" size="sm">
            View All RFPs
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {recentRFPs.map((rfp) => (
            <RFPCard key={rfp.id} {...rfp} />
          ))}
        </div>
      </div>

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