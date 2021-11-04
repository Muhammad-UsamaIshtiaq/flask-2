import React, { useRef, useEffect } from "react";
import API from './../../Api';

export default function PaypalIntregration(props) {
    const paypalRef = useRef();
    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                   return fetch(API.Payment.PaypalOrderCreate(), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                      },
                    body: JSON.stringify({
                            "courseType": props.courseType,
                            "amount": props.amount,
                            "product": props.courseName,
                            "productId": props.courseId
                    })
                   }).then(
                       res => {
                           return res.json()
                       }).then(res => {
                           if(res.meta.statusCode !== "200") throw new Error("error occured");
                           return res.data.orderId
                    })
                },
                onApprove: async (data, actions) => {
                    props.handlePaypalPayment(data);
                },
                onError: (err) => {
                    console.error("ERROR OCCURED WITH PAYPAL: ", err);
                },
            })
            .render(paypalRef.current);
    }, []);
    return (
            <div ref={paypalRef} />
    );
}