type StepIndicatorProps = {
  steps: string[];
  currentStep: number;
};

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => (
  <nav aria-label="Checkout progress">
    <ol className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/60 bg-white/80 p-4 text-sm font-semibold uppercase tracking-wide">
      {steps.map((step, index) => {
        const state =
          index < currentStep ? 'completed' : index === currentStep ? 'current' : 'upcoming';
        return (
          <li key={step} className="flex items-center gap-2">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                state === 'completed'
                  ? 'bg-midnight text-white'
                  : state === 'current'
                    ? 'border-2 border-midnight text-midnight'
                    : 'border border-midnight/20 text-midnight/40'
              }`}
              aria-current={state === 'current' ? 'step' : undefined}
            >
              {index + 1}
            </span>
            <span
              className={`${
                state === 'completed'
                  ? 'text-midnight'
                  : state === 'current'
                    ? 'text-midnight'
                    : 'text-midnight/40'
              }`}
            >
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  </nav>
);

export default StepIndicator;

