// src/components/PayPalCheckoutButton.jsx
import { useEffect, useRef } from 'react';

const PayPalCheckoutButton = ({ amount }) => {
  const paypalRef = useRef();

  useEffect(() => {
    // Load PayPal SDK
    const existingScript = document.getElementById('paypal-sdk');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=AVcRvlgJoDr_SlyWlRgW_...&currency=USD`;
      script.id = 'paypal-sdk';
      script.async = true;
      script.onload = renderButton;
      document.body.appendChild(script);
    } else {
      renderButton();
    }

    function renderButton() {
      if (window.paypal) {
        window.paypal.Buttons({
          style: {
            layout: 'vertical',
            color: 'blue',
            shape: 'pill',
            label: 'paypal',
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: amount.toFixed(2),
                },
              }],
            });
          },
          onApprove: async (data, actions) => {
            const details = await actions.order.capture();
            alert(`✅ Payment completed by ${details.payer.name.given_name}`);
            console.log('Payment details:', details);
          },
          onError: (err) => {
            console.error('PayPal Checkout Error:', err);
            alert('❌ Payment failed.');
          },
        }).render(paypalRef.current);
      }
    }
  }, [amount]);

  return (
    <div className="mt-6 border rounded-lg p-4 shadow bg-white">
      <h3 className="text-lg font-semibold mb-2">Pay with PayPal</h3>
      <div ref={paypalRef}></div>
    </div>
  );
};

export default PayPalCheckoutButton;
