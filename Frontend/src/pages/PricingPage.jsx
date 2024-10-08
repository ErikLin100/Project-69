import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';

export const plans = [
    {
        priceId: 'price_1PqYyFRxBEjt9kiynXIdTizd',
        price: 7.99,
        duration: '/month'
    },
    {
        priceId: 'price_1PqZ4lRxBEjt9kiyDnA5WTDU',
        price: 59.99,
        duration: '/year'
    }
];

const PricingPage = () => {
    const [plan, setPlan] = useState(plans[0]);

    const handleSubscribe = async (planType) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            try {
                const idToken = await user.getIdToken();
                const response = await fetch('/api/stripe/create-checkout-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${idToken}`
                    },
                    body: JSON.stringify({ planType })
                });

                if (!response.ok) {
                    throw new Error('Failed to create checkout session');
                }

                const data = await response.json();
                console.log('Checkout session response:', data);

                if (data.url) {
                    window.location.href = data.url;
                } else {
                    console.error('No URL returned from server');
                }
            } catch (error) {
                console.error('Error during subscription:', error);
                // Handle error (e.g., show error message to user)
            }
        }
    };

    return (
        <>
            <section id="pricing">
                <div className="py-24 px-8 max-w-5xl mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <p className="font-medium text-primary mb-5">Pricing</p>
                        <h2 className="font-bold text-3xl lg:text-5xl tracking-tight">
                            Choose Your Plan
                        </h2>
                    </div>

                    <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
                        <div className="w-full max-w-lg">
                            <div className="relative flex flex-col h-full gap-5 lg:gap-8 z-10 bg-base-100 p-8 rounded-xl">
                                <div className="flex items-center gap-8">
                                    <div
                                        className="flex items-center gap-2"
                                        onClick={() => setPlan(plans[0])}
                                    >
                                        <input
                                            type="radio"
                                            name="monthly"
                                            className="radio"
                                            checked={plan.price === 7.99}
                                            onChange={() => setPlan(plans[0])}
                                        />
                                        <span>Pay monthly</span>
                                    </div>
                                    <div
                                        className="flex items-center gap-2"
                                        onClick={() => setPlan(plans[1])}
                                    >
                                        <input
                                            type="radio"
                                            name="yearly"
                                            className="radio"
                                            checked={plan.price === 59.99}
                                            onChange={() => setPlan(plans[1])}
                                        />
                                        <span>Pay yearly (60% OFF 💰)</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <p className="text-5xl tracking-tight font-extrabold">
                                        ${plan.price}
                                    </p>
                                    <div className="flex flex-col justify-end mb-[4px]">
                                        <p className="text-sm tracking-wide text-base-content/80 uppercase font-semibold">
                                            {plan.duration}
                                        </p>
                                    </div>
                                </div>

                                <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                                    {[
                                        'Feature 1',
                                        'Feature 2',
                                        'Feature 3',
                                        'Feature 4',
                                        'Feature 5',
                                        'Feature 6'
                                    ].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="w-[18px] h-[18px] opacity-80 shrink-0"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="space-y-2">
                                    <button
                                        className="btn btn-primary btn-block"
                                        onClick={() => handleSubscribe(plan.priceId)}
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PricingPage;