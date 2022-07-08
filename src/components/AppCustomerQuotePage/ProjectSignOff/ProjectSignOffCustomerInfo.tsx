import React from 'react';
import moment from 'moment';

type ProjectSignOffCustomerInfoProps =  {
    orderData: {
        orderId: string,
        quoteDate: string,
        customerName: string,
        customerAddress: string,
    }
}

  const ProjectSignOffCustomerInfo = (props: ProjectSignOffCustomerInfoProps) => {
      const {orderData} = props;
    return (
      <>
        <div className="Project-signOff-popup-items" data-testid="signoff-item-title">
          <div className="Project-signOff-popup-item">
            <span className="title">ORDER ID</span>
            <p>{orderData.orderId}</p>
          </div>
          <div className="Project-signOff-popup-item">
            <span className="title">DATE</span>
            <p>{moment(orderData.quoteDate || Date.now()).format('MMM DD, YYYY')}</p>
          </div>
          <div className="Project-signOff-popup-item is-popup-desktop">
            <span className="title">CUSTOMER</span>
            <p>{orderData.customerName}</p>
          </div>
        </div>

        <div className="Project-signOff-popup-item address">
          <span className="title">ADDRESS</span>
          <p>{orderData?.customerAddress}</p>
        </div>
        <div className="Project-signOff-popup-item is-popup-mobile">
          <span className="title">CUSTOMER</span>
          <p>{orderData?.customerName}</p>
        </div>
      </>
    );
  };

export default ProjectSignOffCustomerInfo;