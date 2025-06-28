'use client';

const STEPS = [
  {
    icon: '📝',
    title: 'Create a profile',
    text: 'Sign up and tell us about yourself or your pet.',
  },
  {
    icon: '🔍',
    title: 'Browse & chat',
    text: 'Filter pets that fit your lifestyle and talk with owners securely.',
  },
  {
    icon: '🏡',
    title: 'Meet & adopt',
    text: 'Schedule a meetup and give a pet a forever home.',
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 py-12 px-4">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
        How it works
      </h2>
      <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
        {STEPS.map(step => (
          <div
            key={step.title}
            className="text-center space-y-3 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="text-4xl select-none">{step.icon}</div>
            <h3 className="font-medium text-lg">{step.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
