
export type SignType = 'draw' | 'text';

export type SignData = {
  value: string; 
  type: SignType, 
  signedDate: string
  signedPDF?: string
};

export type Error = {
  text?: boolean;
  draw?: boolean;
  message?: string;
};

export type Order = {
  orderId: string;
  customerName: string;
  customerAddress: string;
  quoteDate: string;
}

export type SignoffStampType = {
  signoff_at: null | string,
  signoff_by: null | string | number,
  signoff_pdf: null | string,
  signoff_img: string,
}

export type ProjectSignOffProps = {
  isSigned: boolean;
  signedDate?: string;
  pdfURL?: string;
}
