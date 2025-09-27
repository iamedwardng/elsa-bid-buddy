export type RFPStatus = "assigning" | "drafting" | "submitted" | "awarded" | "lost" | "not-in-focus";

export type RFPSource = "email" | "portal" | "direct-invitation";

export type Industry = "oil-gas" | "ict" | "infrastructure" | "healthcare" | "finance" | "manufacturing" | "other";

export type Geography = "local" | "regional" | "international";

export type OutcomeReason = "pricing" | "technical" | "relationship" | "compliance" | "other";

export interface SME {
  id: string;
  name: string;
  role: "finance" | "technical" | "legal" | "sales" | "compliance";
  email: string;
}

export interface ComplianceItem {
  id: string;
  requirement: string;
  status: "pending" | "complete" | "not-applicable";
  evidence?: string;
  dueDate?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  assignedTo?: string;
  status: "pending" | "in-progress" | "complete";
  dueDate?: string;
  description?: string;
}

export interface DocumentVersion {
  id: string;
  filename: string;
  version: string;
  uploadedBy: string;
  uploadedAt: string;
  type: "draft" | "approved" | "final" | "supporting";
}

export interface CompetitorIntel {
  id: string;
  competitor: string;
  intelligence: string;
  source: string;
  date: string;
  relevance: "high" | "medium" | "low";
}

export interface RFP {
  // Core Components
  id: string;
  clientCompany: string;
  clientRegistrationPlace: string;
  dateReceived: string;
  submissionDeadline: string;
  title: string;
  specificationDetails: string;
  
  // Metadata
  tenderReference?: string;
  source: RFPSource;
  industry: Industry;
  geography: Geography;
  
  // Commercial & Compliance
  estimatedValue?: string;
  bidBondRequired: boolean;
  bidBondAmount?: string;
  complianceStatus: "compliant" | "non-compliant" | "pending-review";
  mandatoryRequirements: string[];
  complianceChecklist: ComplianceItem[];
  
  // People & Ownership
  assignedPIC?: string;
  supportingSMEs: SME[];
  reviewer?: string;
  approver?: string;
  
  // Operational Workflow
  status: RFPStatus;
  tasks: TaskItem[];
  documents: DocumentVersion[];
  internalNotes: string;
  
  // Decision Support & Intelligence
  winProbability: number;
  winFactors: string[];
  competitorIntel: CompetitorIntel[];
  resourceEffortLogged: number; // hours
  estimatedCost: number;
  riskFlags: string[];
  
  // Analytics & Post-Mortem
  outcome?: "won" | "lost" | "not-pursued";
  outcomeReason?: OutcomeReason;
  outcomeNotes?: string;
  lessonsLearned?: string;
  similarRFPs: string[]; // IDs of similar past RFPs
  
  // System fields
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}