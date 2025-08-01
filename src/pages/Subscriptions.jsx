import React, { useState } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';

const plans = [
  {
    name: 'Starter',
    description: 'Ideal for small projects',
    price: 'Free',
    features: [
      'Unlimited personal files',
      'Email support',
      'CSV data export',
      'Basic analytics dashboard',
      '1,000 API calls per month',
    ],
    button: 'Try for free',
    highlight: false,
  },
  {
    name: 'Professional',
    description: 'For freelancers and startups',
    price: '$15',
    priceSuffix: '/per user',
    features: [
      'All starter features +',
      'Up to 5 user accounts',
      'Team collaboration tools',
      'Custom dashboards',
      'Multiple data export formats',
      'Basic custom integrations',
    ],
    button: 'Currently Active',
    highlight: true,
    mostPopular: true,
  },
  {
    name: 'Organization',
    description: 'For fast-growing businesses',
    price: '$30',
    priceSuffix: '/per user',
    features: [
      'All professional features +',
      'Enterprise security suite',
      'Single Sign-On (SSO)',
      'Custom contract terms',
      'Dedicated phone support',
      'Custom integration support',
      'Compliance tools',
    ],
    button: 'Select plan',
    highlight: false,
  },
];

const Subscriptions = () => {
  const [billing, setBilling] = useState('Monthly');
  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-2 text-center">Plans & Pricing</h1>
      <p className="text-center text-gray-600 max-w-2xl mb-10">Choose the plan that fits your needs. All plans include essential features to get you started, with options to scale as you grow. No hidden fees and the flexibility to change anytime.</p>
      <div className="flex gap-2 mb-2 bg-[#dadada] p-1 rounded-lg">
        <button onClick={() => setBilling('Monthly')} className={`px-6 py-1.5 rounded-lg text-sm font-medium ${billing === 'Monthly' ? 'bg-white' : 'bg-[#dadada] text-black'}`}>Monthly</button>
        <button onClick={() => setBilling('Annual')} className={`px-6 py-1.5 rounded-lg text-sm font-medium ${billing === 'Annual' ? 'bg-white' : 'bg-[#dadada] text-black'}`}>Annual</button>
      </div>
      <div className="text-xs text-blue-600 mb-16">-15% off on annual payments</div>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-end w-full max-w-5xl">
        {plans.map((plan, idx) => (
          <div key={plan.name} className={`flex-1 bg-white rounded-2xl shadow p-8 border h-[491px] ${plan.highlight ? 'border-black  border-4 scale-105 z-10' : 'border-gray-200'} relative`}>
            {plan.mostPopular && <div className="absolute -top-8 left-0 bg-black w-full text-white text-xs border-4 border-black px-4 py-1 rounded-t-2xl font-semibold">Most Popular</div>}
            <div className="text-xl font-bold mb-1 text-left">{plan.name}</div>
            <div className="text-sm text-gray-600 mb-4 text-left">{plan.description}</div>
            <div className="text-3xl font-bold mb-2">{plan.price} <span className="text-base font-normal">{plan.priceSuffix}</span></div>
            <ul className="mb-16 text-sm text-left w-full max-w-xs mx-auto">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 mb-2"><FaRegCheckCircle />{feature}</li>
              ))}
            </ul>
            <button className={`absolute bottom-10 w-[80%] py-2 rounded-lg text-sm font-semibold ${plan.highlight ? 'bg-black text-white' : 'bg-[#dadada] text-black'}`}>{plan.button}</button>
            {plan.highlight && <div className="mt-2 text-xs text-center underline cursor-pointer">or contact sales</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions; 