import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { RFP, RFPSource, Industry, Geography } from "@/types/rfp";
import { X, Plus, Save, Calendar } from "lucide-react";

interface RFPCreateFormProps {
  onSave?: (rfp: Partial<RFP>) => void;
  onCancel?: () => void;
  initialData?: Partial<RFP>;
}

const RFPCreateForm = ({ onSave, onCancel, initialData }: RFPCreateFormProps) => {
  const [formData, setFormData] = useState<Partial<RFP>>({
    clientCompany: "",
    clientRegistrationPlace: "",
    title: "",
    specificationDetails: "",
    tenderReference: "",
    source: "email" as RFPSource,
    industry: "other" as Industry,
    geography: "local" as Geography,
    estimatedValue: "",
    bidBondRequired: false,
    bidBondAmount: "",
    mandatoryRequirements: [],
    riskFlags: [],
    winProbability: 50,
    resourceEffortLogged: 0,
    estimatedCost: 0,
    ...initialData
  });

  const [newRequirement, setNewRequirement] = useState("");
  const [newRiskFlag, setNewRiskFlag] = useState("");

  const handleInputChange = (field: keyof RFP, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addMandatoryRequirement = () => {
    if (newRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        mandatoryRequirements: [...(prev.mandatoryRequirements || []), newRequirement.trim()]
      }));
      setNewRequirement("");
    }
  };

  const removeMandatoryRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      mandatoryRequirements: prev.mandatoryRequirements?.filter((_, i) => i !== index) || []
    }));
  };

  const addRiskFlag = () => {
    if (newRiskFlag.trim()) {
      setFormData(prev => ({
        ...prev,
        riskFlags: [...(prev.riskFlags || []), newRiskFlag.trim()]
      }));
      setNewRiskFlag("");
    }
  };

  const removeRiskFlag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      riskFlags: prev.riskFlags?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSave = () => {
    // Add current date/time for new RFPs
    const rfpData: Partial<RFP> = {
      ...formData,
      dateReceived: formData.dateReceived || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: (formData.status as RFP['status']) || "assigning",
      complianceStatus: "pending-review" as RFP['complianceStatus'],
      supportingSMEs: [],
      complianceChecklist: [],
      tasks: [],
      documents: [],
      competitorIntel: [],
      internalNotes: "",
      winFactors: []
    };
    
    onSave?.(rfpData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">
          {initialData?.id ? "Edit RFP" : "Create New RFP"}
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4" />
            Save RFP
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">RFP Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter RFP title"
              />
            </div>

            <div>
              <Label htmlFor="clientCompany">Client Company *</Label>
              <Input
                id="clientCompany"
                value={formData.clientCompany}
                onChange={(e) => handleInputChange("clientCompany", e.target.value)}
                placeholder="Enter client company name"
              />
            </div>

            <div>
              <Label htmlFor="clientRegistration">Client Place of Registration *</Label>
              <Input
                id="clientRegistration"
                value={formData.clientRegistrationPlace}
                onChange={(e) => handleInputChange("clientRegistrationPlace", e.target.value)}
                placeholder="Enter registration location"
              />
            </div>

            <div>
              <Label htmlFor="tenderReference">Tender Reference</Label>
              <Input
                id="tenderReference"
                value={formData.tenderReference}
                onChange={(e) => handleInputChange("tenderReference", e.target.value)}
                placeholder="Enter tender reference number"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateReceived">Date Received</Label>
                <Input
                  id="dateReceived"
                  type="date"
                  value={formData.dateReceived}
                  onChange={(e) => handleInputChange("dateReceived", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="submissionDeadline">Submission Deadline *</Label>
                <Input
                  id="submissionDeadline"
                  type="date"
                  value={formData.submissionDeadline}
                  onChange={(e) => handleInputChange("submissionDeadline", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Classification */}
        <Card>
          <CardHeader>
            <CardTitle>Classification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="source">Source</Label>
              <Select
                value={formData.source}
                onValueChange={(value: RFPSource) => handleInputChange("source", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="portal">Portal</SelectItem>
                  <SelectItem value="direct-invitation">Direct Invitation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select
                value={formData.industry}
                onValueChange={(value: Industry) => handleInputChange("industry", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oil-gas">Oil & Gas</SelectItem>
                  <SelectItem value="ict">ICT</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="geography">Geography</Label>
              <Select
                value={formData.geography}
                onValueChange={(value: Geography) => handleInputChange("geography", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Local</SelectItem>
                  <SelectItem value="regional">Regional</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="estimatedValue">Estimated Contract Value</Label>
              <Input
                id="estimatedValue"
                value={formData.estimatedValue}
                onChange={(e) => handleInputChange("estimatedValue", e.target.value)}
                placeholder="e.g., $2.5M"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="bidBondRequired">Bid Bond Required</Label>
                <Switch
                  id="bidBondRequired"
                  checked={formData.bidBondRequired}
                  onCheckedChange={(checked) => handleInputChange("bidBondRequired", checked)}
                />
              </div>
              
              {formData.bidBondRequired && (
                <div>
                  <Label htmlFor="bidBondAmount">Bid Bond Amount</Label>
                  <Input
                    id="bidBondAmount"
                    value={formData.bidBondAmount}
                    onChange={(e) => handleInputChange("bidBondAmount", e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Specification Details */}
      <Card>
        <CardHeader>
          <CardTitle>Specification Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.specificationDetails}
            onChange={(e) => handleInputChange("specificationDetails", e.target.value)}
            placeholder="Enter detailed RFP specification and requirements..."
            className="min-h-32"
          />
        </CardContent>
      </Card>

      {/* Mandatory Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Mandatory Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              placeholder="Add mandatory requirement"
              onKeyPress={(e) => e.key === 'Enter' && addMandatoryRequirement()}
            />
            <Button onClick={addMandatoryRequirement}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {formData.mandatoryRequirements?.map((req, index) => (
              <Badge key={index} variant="outline" className="gap-1">
                {req}
                <button
                  onClick={() => removeMandatoryRequirement(index)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newRiskFlag}
              onChange={(e) => setNewRiskFlag(e.target.value)}
              placeholder="Add risk flag"
              onKeyPress={(e) => e.key === 'Enter' && addRiskFlag()}
            />
            <Button onClick={addRiskFlag}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {formData.riskFlags?.map((risk, index) => (
              <Badge key={index} variant="destructive" className="gap-1">
                {risk}
                <button
                  onClick={() => removeRiskFlag(index)}
                  className="ml-1 hover:text-destructive-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Estimation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Win Probability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="winProbability">Initial Win Probability (%)</Label>
              <Input
                id="winProbability"
                type="number"
                min="0"
                max="100"
                value={formData.winProbability}
                onChange={(e) => handleInputChange("winProbability", parseInt(e.target.value) || 0)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Estimation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="estimatedCost">Estimated Cost ($)</Label>
              <Input
                id="estimatedCost"
                type="number"
                value={formData.estimatedCost}
                onChange={(e) => handleInputChange("estimatedCost", parseFloat(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
            
            <div>
              <Label htmlFor="resourceEffort">Resource Effort (hours)</Label>
              <Input
                id="resourceEffort"
                type="number"
                value={formData.resourceEffortLogged}
                onChange={(e) => handleInputChange("resourceEffortLogged", parseFloat(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RFPCreateForm;