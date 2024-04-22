import React, { useState } from 'react';
import './PaymentPage.css';

function PaymentPage() {
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolderName: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would usually handle the submission to the server
        console.log("Payment Info: ", paymentInfo);
        alert("Payment submitted. Implement the backend logic to process payment.");
    };

    return (
        <div className="payment-form-container">
            <form onSubmit={handleSubmit} className="payment-form">
                <h2>Payment Information</h2>
                <div className="form-group">
                    <label htmlFor="cardNumber">Card Number:</label>
                    <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date:</label>
                    <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cvv">CVV:</label>
                    <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={paymentInfo.cvv}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cardHolderName">Card Holder Name:</label>
                    <input
                        type="text"
                        id="cardHolderName"
                        name="cardHolderName"
                        value={paymentInfo.cardHolderName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Submit Payment</button>
            </form>
        </div>
    );
}

export default PaymentPage;
