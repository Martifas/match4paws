type StepIndicatorProps = {
  totalSteps: number;
  activeStep: number;
  className?: string;
};

export default function StepIndicator({
  totalSteps,
  activeStep,
  className,
}: StepIndicatorProps) {
  return (
    <div className={`flex justify-center gap-2 ${className}`}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full transition-all duration-300 ${
            index === activeStep
              ? 'bg-[#ed9426] w-10 h-3'
              : 'bg-gray-300 w-3 h-3'
          }`}
        />
      ))}
    </div>
  );
}
