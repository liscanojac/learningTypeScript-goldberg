type MotionBase = {
  from: "defendant" | "plaintiff";
  reason: string;
}

type Status = AllowedOrPending | Denied

type AllowedOrPending = {
  status: "allowed" | "pending";
}

type Denied = {
  status: "denied";
  annoyedJustice: boolean;
}

type Step = PreTrial | PostTrial | NewTrial;

type PreTrial = {
  step: "pre-trial";
  classification: "dismiss" | "suppress" | "venue"
  deliberationHours: number;
}

type PostTrial = {
  step: "post-trial";
  classification: "acquittal" | "correction";
  deliberationHours: number;
}

type NewTrial = {
  step: "post-trial";
  classification: "new trial";
  estimatedDeliberationHours: number;
}

export type Motion = MotionBase & Status & Step