import { useEffect } from 'react';
import {
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import useCheckout from '../hooks/useCheckout';

// This values are the props in the UI
// sb-pcrjd8821896@personal.example.com <- test-account
const style = { layout: 'vertical' };

// Custom component to wrap the PayPalButtons and handle currency changes
export const PPButton = ({ currency, showSpinner }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] =
    usePayPalScriptReducer();

  // const amount = '2';
  const { cart, setCart } = useCheckout();

  const amount = cart
    .map(({ price, quantity }) => price * quantity)
    .reduce((a, b) => a + b, 0);

  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && (
        <div className="spinner" />
      )}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function () {
            setCart([]);
          });
        }}
      />
    </>
  );
};
