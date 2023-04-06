export type ProgressProps = {
  currentStep: number;
  length: number;
  direction?: "row" | "column";
};

export type ProgressStepProps = {
  stepNumber: number;
  currentStep: number;
};
