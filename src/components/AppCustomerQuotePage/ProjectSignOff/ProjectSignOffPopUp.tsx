import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {Portal} from 'react-portal';
import ReactSignatureCanvas from 'react-signature-canvas';
import classNames from 'classnames';
import moment from 'moment';

import {Button, FormField, Input, SignOffPad, Spinner} from '@ergeon/core-components';

import IconWarning from '@ergeon/core-components/src/assets/icon-warning.svg';
import IconMark from '@ergeon/core-components/src/assets/icon-success.svg';
import IconCross from '@ergeon/core-components/src/assets/icon-cross-gray.svg';

import ProjectSignOffCustomerInfo from './ProjectSignOffCustomerInfo';

import {Error, Order, SignData, SignType} from './types';

const MAX_TEXT_LENGTH = 30;
const PATH_NAME = 'sign-off';

interface ProjectSignOffPopUpProps {
  asPDF?: boolean;
  isSigned: boolean;
  onSubmit(value: string, type: SignType): void;
  loading: boolean;
  signatureData: SignData;
  orderData: Order
}

const ProjectSignOffPopUp = (props: ProjectSignOffPopUpProps) => {
  const {asPDF, isSigned, loading, onSubmit, orderData, signatureData} = props;

  const [signatureType, setSignatureType] = useState<SignType>();
  const [signatureImageData, setSignatureImageData] = useState('');
  const [signatureText, setSignatureText] = useState('');
  const [error, setError] = useState<Error>({});

  const history = useHistory();
  const location = useLocation();

  const showSignOffPopUp = useMemo(() => {
    return RegExp(PATH_NAME).test(location.pathname.trim());
  }, [location]);

  const canvasRef = useRef<ReactSignatureCanvas>();
  const ref = useRef<HTMLDivElement>(null);

  const onSubmitSignature = useCallback(() => {
    const value = signatureText.trim() || signatureImageData.trim();
    if (signatureType) {
      onSubmit(value, signatureType);
      setError({...error, text: false, draw: false, message: ''});
    }
  }, [onSubmit, signatureText, signatureImageData, signatureType, setError, error]);

  const onInputTextChange = useCallback((event) => {
      const value = event.target.value;
      if (value.length > MAX_TEXT_LENGTH) {
        let message = 'Max length of characters should not be more than 30!';
        setError({...error, text: true, message});
        return;
      }
      setSignatureText(value);
      setSignatureType('text');
      setError({...error, text: false, message: ''});
    }, [setSignatureText, setSignatureType, setError, error]);

  const onInputDrawChange = useCallback((value: string) => {
      setSignatureImageData(value);
      setSignatureType('draw');
    }, [setSignatureImageData, setSignatureType]);

  const disableButton = useMemo(() => {
    const hasValue = signatureImageData.trim() || signatureText.trim();
    if (loading || !hasValue) {
      return true;
    }
    return false;
  }, [signatureImageData, signatureText, loading]);

  const clearSignatureInput = useCallback(() => {
    canvasRef?.current?.clear();
    setSignatureImageData('');
  }, [canvasRef.current, setSignatureImageData]);

  const clearTextInput = useCallback(() => {
    setSignatureText('');
  }, [setSignatureText]);

  const onClose = () => {
    const url = location.pathname.replace(/\/sign-off.*/i,'');
    history.push(url);
  };

  const closeOnParentClick = (e: MouseEvent) => {
    if (e.target === ref.current) {
      onClose()
    }
  };

  const PopupClassName = useMemo(() => {
    return classNames('Project-signOff-popup', {
      'Project-signOff-popup-pdf': !!asPDF,
      'is-popup-desktop': isSigned && !asPDF
    });
  }, [isSigned, asPDF]);

  const PopupMobileClassName = useMemo(() => {
    return classNames('Project-signOff-mobileComplete', {
      'is-popup-mobile': isSigned && asPDF
    });
  }, [isSigned, asPDF]);

  const PopupMobileRender = useMemo(() => {
    return (
      <div className={PopupMobileClassName}>
        <div className="Project-signOff-mobileComplete-wrapper">
          <img className="icon" src={IconMark} />
          <div className="Project-signOff-mobileComplete-desc">
            <h5>Project Sign-Off Complete</h5>
            <p data-testid="name-stamp">{orderData?.customerName}</p>
            <p data-testid="address-stamp">{orderData.customerAddress}</p>
            <p data-testid="date-stamp">{moment(signatureData?.signedDate).format('MMM DD, YYYY')}</p>
          </div>
        </div>
      </div>
    );
  }, [PopupMobileClassName, orderData]);

  const renderTitle = useMemo(() => {
    if (isSigned) {
    return <>
      <img className="icon" src={IconMark} /> 
      <h5>Project Sign-Off Complete</h5> 
    </>
    }
    return <>
      <img className="icon" src={IconWarning} />
      <h5>Project Sign-Off</h5>
    </>
  }, [isSigned])

  useEffect(function closePopup() {
      if (!ref.current) return;
      window.addEventListener('click', closeOnParentClick);
      return () => {
        window.removeEventListener('click', closeOnParentClick);
      };
    }, [closeOnParentClick, ref.current]);

  useEffect(function clearInputs() {
      if (signatureType === 'text') {
        clearSignatureInput();
      } else {
        clearTextInput();
      }
    }, [clearSignatureInput, clearTextInput, signatureType]);

  return (
    showSignOffPopUp ? (
      <Portal node={document.querySelector('body')}>
        <div className={PopupClassName} ref={ref}>
          <div className="Project-signOff-popup-wrapper">
            <div className="Project-signOff-popup-header">
              <div className="Project-signOff-title">
                {renderTitle}
              </div>
              {!asPDF && (
                <Button flavor="regular" onClick={onClose} size="medium" taste="boundless">
                  <img sizes="medium" src={IconCross} />
                </Button>
              )}
            </div>
            <div className="Project-signOff-popup-details">
              <ProjectSignOffCustomerInfo orderData={orderData}/>
              <div className="Project-signOff-popup-desc">
                <span>
                  By signing this form, I acknowledge that (i) the Service Provider and I have completed a walk-through
                  inspection of the Services performed at the Location, (ii) I was not present when the Service provider
                  completed the project but have done a walkthrough inspection of the services performed at the
                  Location, (iii) the Services performed conform to those I requested in the Quote; and (iv) the
                  Services have been fully completed by the Service Provider to my satisfaction.
                  <br />
                  <br />I acknowledge and agree if I’m not satisfied with the Services, I will not sign this form and I
                  shall notify the Service Provider of my rejection of the Services immediately after the Service
                  Provider and I completed the inspection of the Services; failure to give notice of rejection before
                  the Service Provider leaves the Location will consititue my acceptance of the Services. A rejection
                  notice will be effective only if it provides a detailed description of any failure of the Service
                  Provider before the Service Provider leaves the Location.
                </span>
              </div>
              <div className="Project-signOff-popup-content">
                <h5>Satisfied with your Ergeon project?</h5>
                <span>Please provide your signature OR type your full name below.</span>
              </div>
              <div className="Project-signOff-popup-signature">
                <SignOffPad onChange={onInputDrawChange} ref={canvasRef} signedValue={signatureData} />
                {!isSigned && (
                  <FormField>
                    <>
                      {!signatureData?.value && <Input onChange={onInputTextChange} value={signatureText} />}
                      {error?.text && <p className="is-popup-form-error">{error.message}</p>}
                    </>
                  </FormField>
                )}
              </div>
            </div>
            {!isSigned && (
              <Button
                className="submit"
                disabled={disableButton}
                flavor="cta"
                onClick={onSubmitSignature}
                size="large"
                taste="solid"
              >
                {loading 
                ? <div data-testid="button-spinner">
                    <Spinner active={true} borderWidth={0.1} color="white" size={30} />
                  </div>
                : 'Submit'}
              </Button>
            )}
          </div>
        </div>
        {isSigned && PopupMobileRender}
      </Portal>
    ) : null
  );
};

export default ProjectSignOffPopUp;
